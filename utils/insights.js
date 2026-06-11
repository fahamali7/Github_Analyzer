const insights = (user, repos) =>{

    const totalStars = repos.reduce((sum, repo) =>{
        return sum += (repo.stargazers_count || 0)
    }, 0);

    const totalForks = repos.reduce(
        (sum, repo) =>{
            return sum + (repo.forks_count || 0);
        }, 0);

    return {
        username: user.login,
        name: user.name,
        bio: user.bio,

        followers: user.followers,
        following: user.following,

        public_repos: user.public_repos,
        public_gists: user.public_gists,

        total_stars: totalStars,
        total_forks: totalForks,

        profile_url: user.html_url,

        avatar_url: user.avatar_url
    };
};

module.exports = insights;