'use client'
import * as React from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import type { ThemeOptions } from '@mui/material/styles';
import { inputsCustomizations } from '@/theme/customizations/inputs';
import { dataDisplayCustomizations } from '@/theme/customizations/data-display';
import { feedbackCustomizations } from '@/theme/customizations/feedback';
import { navigationCustomizations } from '@/theme/customizations/navigation';
import { surfacesCustomizations } from '@/theme/customizations/surfaces';
import { colorSchemes, typography, shadows, shape } from '@/theme/primitive-theme';

interface AppThemeProps {
    children: React.ReactNode;
    themeComponents?: ThemeOptions['components'];
}

export default function AppTheme(props: AppThemeProps) {
    const { children, themeComponents } = props;
    const theme = React.useMemo(() => {
        return createTheme({
            cssVariables: {
                colorSchemeSelector: 'data-mui-color-scheme',
                cssVarPrefix: 'template',
            },
            colorSchemes,
            typography,
            shadows,
            shape,
            components: {
                ...inputsCustomizations,
                ...dataDisplayCustomizations,
                ...feedbackCustomizations,
                ...navigationCustomizations,
                ...surfacesCustomizations,
                ...themeComponents,
            },
        });
    }, [themeComponents]);
    return (
        <ThemeProvider theme={theme} disableTransitionOnChange>
            {children}
        </ThemeProvider>
    );
}
