var ghpages = require('gh-pages');

ghpages.publish(
	'public', // path to public directory
	{
		branch: 'gh-pages',
		repo: 'https://github.com/littlesketches/znet-hepburn-cc-adaptation', // Update to point to your repository
		user: {
			name: 'littlesketches', // update to use your name
			email: 'brendan@littlesketch.es' // Update to use your email
		},
		dotfiles: true
	},
	() => {
		console.log('Deploy Complete!');
	}
);