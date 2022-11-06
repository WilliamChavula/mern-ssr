const config = {
	env: process.env.NODE_ENV || 'development',
	jwtSecret: process.env.JWT_SECRET || '2u31s3&fodRaquh5+r?wEn-P!a-rAv',
	mongoUri:
		process.env.MONGO_URI ||
		process.env.MONGO_HOST ||
		`mongodb://${process.env.IP || 'localhost'}:${
			process.env.PORT || '27017'
		}/mernproject`,
	port: process.env.PORT || 3001,
};

export default config;
