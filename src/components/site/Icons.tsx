import MaterialIcon from './MaterialIcon';

type IconProps = {
    className?: string;
    size?: number;
};

// Brand marks (not in Material), drawn by hand.

export function LinkedInIcon({ className, size = 20 }: IconProps) {
    return (
        <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.34V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0z" />
        </svg>
    );
}

export function GithubIcon({ className, size = 20 }: IconProps) {
    return (
        <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M12 .3a12 12 0 0 0-3.8 23.38c.6.12.83-.26.83-.57v-2.03c-3.34.73-4.04-1.6-4.04-1.6-.55-1.4-1.34-1.77-1.34-1.77-1.08-.74.09-.73.09-.73 1.2.09 1.83 1.24 1.83 1.24 1.07 1.83 2.8 1.3 3.49 1 .1-.78.42-1.3.76-1.6-2.67-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.14-.3-.54-1.52.1-3.18 0 0 1-.32 3.3 1.23a11.5 11.5 0 0 1 6 0c2.28-1.55 3.29-1.23 3.29-1.23.64 1.66.24 2.88.12 3.18a4.65 4.65 0 0 1 1.23 3.22c0 4.61-2.8 5.63-5.48 5.92.42.36.81 1.1.81 2.22v3.29c0 .32.21.69.82.57A12 12 0 0 0 12 .3z" />
        </svg>
    );
}

// Material icons, kept under their old names so call sites did not change.

export const MailIcon = (props: IconProps) => <MaterialIcon name="email" size={20} {...props} />;
export const MapPinIcon = (props: IconProps) => <MaterialIcon name="place" size={20} {...props} />;
export const SunIcon = (props: IconProps) => <MaterialIcon name="light-mode" size={20} {...props} />;
export const MoonIcon = (props: IconProps) => <MaterialIcon name="dark-mode" size={20} {...props} />;
export const MenuIcon = (props: IconProps) => <MaterialIcon name="menu" size={20} {...props} />;
export const CloseIcon = (props: IconProps) => <MaterialIcon name="close" size={20} {...props} />;
export const CheckIcon = (props: IconProps) => <MaterialIcon name="check" size={20} {...props} />;
export const ArrowRightIcon = (props: IconProps) => <MaterialIcon name="arrow-forward" size={20} {...props} />;
export const CalendarIcon = (props: IconProps) => <MaterialIcon name="description" size={20} {...props} />;
