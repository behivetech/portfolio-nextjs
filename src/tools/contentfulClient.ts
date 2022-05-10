import { createClient } from 'contentful';

const client = createClient({
    accessToken: process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN as string,
    space: process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID as string
    // accessToken: 'YXHN53i6B5Zt0V2_4sM7g4FTCqKBFlAWWTjNXDQuX4w' as string,
    // space: 'o3fg5bb4swpz' as string,
});

export default client
