/** @type {import('next').NextConfig} */
const nextConfig = {
	env: {
		BASE_URL: process.env.BASE_URL,
        API_URL: `${process.env.BASE_URL}/api`
	},
	images: {
		dangerouslyAllowSVG: true,
		domains: ["pbs.twimg.com", "avataaars.io"],
	},
};

module.exports = nextConfig;
