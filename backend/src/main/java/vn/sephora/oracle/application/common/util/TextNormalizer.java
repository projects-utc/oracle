package vn.sephora.oracle.application.common.util;

import org.springframework.util.StringUtils;

public final class TextNormalizer {
    private TextNormalizer() {}

    public static String blankToNull(String text) {
        if (!StringUtils.hasText(text)) {
            return null;
        }
        return text.trim();
    }
}
