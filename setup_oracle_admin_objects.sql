-- ==============================================================================
-- KỊCH BẢN QUẢN TRỊ CƠ SỞ DỮ LIỆU ORACLE 23ai / 26ai FREE
-- Môn: Hệ quản trị cơ sở dữ liệu Oracle - Khoa CNTT, Đại học Giao thông Vận tải (UTC)
-- Nhóm 3 sinh viên thực hiện
-- ==============================================================================

-- ==============================================================================
-- PHẦN 1: KIẾN TRÚC ORACLE SERVER VÀ MULTITENANT (CHƯƠNG 1)
-- ==============================================================================

-- 1.1 Kiểm tra thông tin Container hiện tại (CDB hay PDB)
SHOW CON_NAME;
SHOW CON_ID;

-- 1.2 Liệt kê danh sách các PDBs trong hệ thống
SELECT con_id, name, open_mode, restricted FROM v$pdbs;

-- 1.3 Kiểm tra cấu trúc bộ nhớ SGA và PGA của Instance
SHOW SGA;
SELECT pool, name, bytes / 1024 / 1024 AS size_mb FROM v$sgastat WHERE pool = 'shared pool' AND ROWNUM <= 10;

-- 1.4 Kiểm tra các tiến trình nền cốt lõi (DBWn, LGWR, CKPT, SMON, PMON)
SELECT pid, sosid, pname, program FROM v$process WHERE pname IN ('DBW0', 'LGWR', 'CKPT', 'SMON', 'PMON');


-- ==============================================================================
-- PHẦN 2: QUẢN LÝ TABLESPACES VÀ DATAFILES (CHƯƠNG 2)
-- ==============================================================================

-- 2.1 Tạo Tablespace chuyên biệt lưu trữ dữ liệu ứng dụng (Permanent Tablespace)
-- Áp dụng kỹ thuật quản lý Extent cục bộ (EXTENT MANAGEMENT LOCAL) và tự động mở rộng
CREATE TABLESPACE sephora_data_tbs
DATAFILE 'sephora_data01.dbf' SIZE 50M
AUTOEXTEND ON NEXT 10M MAXSIZE 500M
EXTENT MANAGEMENT LOCAL AUTOALLOCATE;

-- 2.2 Tạo Tablespace chuyên biệt lưu trữ chỉ mục (Index Tablespace)
-- Tách rời Tablespace dữ liệu và chỉ mục giúp giảm tranh chấp I/O đĩa
CREATE TABLESPACE sephora_idx_tbs
DATAFILE 'sephora_idx01.dbf' SIZE 30M
AUTOEXTEND ON NEXT 5M MAXSIZE 200M
EXTENT MANAGEMENT LOCAL AUTOALLOCATE;

-- 2.3 Mở rộng dung lượng Tablespace bằng lệnh RESIZE hoặc ADD DATAFILE
ALTER TABLESPACE sephora_data_tbs RESIZE 80M;

-- 2.4 Kiểm tra thông tin dung lượng và trạng thái của các Tablespace
SELECT
    tablespace_name,
    status,
    contents,
    extent_management,
    allocation_type
FROM dba_tablespaces
WHERE tablespace_name LIKE 'SEPHORA%';

-- 2.5 Kiểm tra chi tiết các Datafile vật lý
SELECT
    file_name,
    tablespace_name,
    bytes / 1024 / 1024 AS size_mb,
    autoextensible,
    maxbytes / 1024 / 1024 AS max_mb
FROM dba_data_files
WHERE tablespace_name LIKE 'SEPHORA%';

-- 2.6 Kiểm tra không gian còn trống (Free Space)
SELECT
    tablespace_name,
    SUM(bytes) / 1024 / 1024 AS free_mb
FROM dba_free_space
WHERE tablespace_name LIKE 'SEPHORA%'
GROUP BY tablespace_name;


-- ==============================================================================
-- PHẦN 3: QUẢN TRỊ NGƯỜI DÙNG, CHỨC DANH (ROLE) VÀ PHÂN QUYỀN (CHƯƠNG 3)
-- ==============================================================================

-- 3.1 Tạo các Chức danh (Role) phân tầng theo nguyên tắc đặc quyền tối thiểu
CREATE ROLE sephora_app_role;
CREATE ROLE sephora_admin_role;
CREATE ROLE sephora_readonly_role;

-- 3.2 Gán quyền hệ thống (System Privileges)
-- Gán quyền kết nối cơ bản
GRANT CREATE SESSION TO sephora_app_role;
GRANT CREATE SESSION TO sephora_admin_role;
GRANT CREATE SESSION TO sephora_readonly_role;

-- Gán quyền quản trị cho admin role với ADMIN OPTION
GRANT CREATE TABLE, CREATE VIEW, CREATE PROCEDURE, CREATE SEQUENCE TO sephora_admin_role WITH ADMIN OPTION;

-- 3.3 Gán quyền đối tượng (Object Privileges) trên Schema ứng dụng ora_u8k4m2p9
GRANT SELECT, INSERT, UPDATE, DELETE ON ora_u8k4m2p9.sep_orders TO sephora_app_role;
GRANT SELECT, INSERT, UPDATE, DELETE ON ora_u8k4m2p9.sep_order_items TO sephora_app_role;
GRANT SELECT, INSERT, UPDATE, DELETE ON ora_u8k4m2p9.sep_cart_items TO sephora_app_role;
GRANT SELECT, UPDATE ON ora_u8k4m2p9.sep_products TO sephora_app_role;
GRANT SELECT, UPDATE ON ora_u8k4m2p9.sep_users TO sephora_app_role;
GRANT SELECT, INSERT ON ora_u8k4m2p9.sep_audit_logs TO sephora_app_role;
GRANT EXECUTE ON ora_u8k4m2p9.PKG_ORDER_PROCESSING TO sephora_app_role;

-- Quyền cho tầng báo cáo (Read-only)
GRANT SELECT ON ora_u8k4m2p9.VW_DASHBOARD_METRICS TO sephora_readonly_role;
GRANT SELECT ON ora_u8k4m2p9.VW_MONTHLY_REVENUE TO sephora_readonly_role;
GRANT SELECT ON ora_u8k4m2p9.sep_products TO sephora_readonly_role;
GRANT SELECT ON ora_u8k4m2p9.sep_orders TO sephora_readonly_role;

-- 3.4 Tạo người dùng ứng dụng cục bộ (Local User) trong PDB
-- Chỉ định Default Tablespace, Temporary Tablespace và Quota lưu trữ
CREATE USER sephora_app IDENTIFIED BY "SephoraApp#2026"
DEFAULT TABLESPACE sephora_data_tbs
TEMPORARY TABLESPACE temp
QUOTA 100M ON sephora_data_tbs;

-- 3.5 Gán Role cho người dùng và thiết lập Default Role
GRANT sephora_app_role TO sephora_app;
ALTER USER sephora_app DEFAULT ROLE sephora_app_role;

-- 3.6 Truy vấn kiểm chứng phân quyền từ Từ điển Dữ liệu (Data Dictionary Views)
-- Tra cứu người dùng
SELECT username, account_status, default_tablespace, temporary_tablespace, created
FROM dba_users
WHERE username IN ('SEPHORA_APP', 'ORA_U8K4M2P9');

-- Tra cứu hạn mức (Quota)
SELECT tablespace_name, username, bytes / 1024 / 1024 AS used_mb, max_bytes / 1024 / 1024 AS quota_mb
FROM dba_ts_quotas
WHERE username = 'SEPHORA_APP';

-- Tra cứu các Role đã được gán
SELECT grantee, granted_role, admin_option, default_role
FROM dba_role_privs
WHERE grantee IN ('SEPHORA_APP', 'SEPHORA_APP_ROLE', 'SEPHORA_ADMIN_ROLE');

-- Tra cứu quyền đối tượng của Role
SELECT role, table_name, privilege
FROM role_tab_privs
WHERE role IN ('SEPHORA_APP_ROLE', 'SEPHORA_READONLY_ROLE')
ORDER BY role, table_name;
