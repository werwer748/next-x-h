// @ts-check

/** @type {import('next').NextConfig} */
const nextConfig = {
    /* config options here */
    //* 이미지의 경로를 바꿔주기위한 설정
    async rewrites() {
        return [
            {
                source: '/upload/:slug',
                destination: 'http://localhost:9090/upload/:slug',
            }
        ]
    }
}

module.exports = nextConfig