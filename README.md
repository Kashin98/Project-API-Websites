# Project-API-Websites
Built Multiple websites using APIs to understand AJAX programming. Also used bootstrap 4 framework for CSS to practice.

## Interesting Issue I faced when building this project:

There is an issue hosting this website on Netlify and AWS Cloudfront traffic redirection distrbutions. The above services requests the website's resources over a https secure conn. While most of the APIs I used for this website are delivering the resources over https, the Open Weather API requires I pay 40$ a month to request API calls over https instead of the free http option, understandable since not everything can be free. I think this will be an issue for anyone trying to deploy on netlify as their main platform since it doesn't have the option to give website access over http or I have not found it .

But how is it hosted on AWS Cloudfront where I always setup my Cloudfront distribution settings to redirect all traffic to HTTPS. Well the AWS CF settings are not the same for this CF distribution, for this distribution I gave the permission to allow HTTP and HTTPS. You can test it by changing the below cdn link to http:// or https:// and you will see them both go through, unlike all my other projects which always redirects to https://. Remember, if you change the link to https:// the weather app will fail due to the API calling an insecure resource over http which https will prevent, the error is visible in console when searching for a city.

That is why entire website is being run over HTTP. This should not be an issue since the website doesn't handle or request any user personal/sensitive user information and thus HTTPS is not a necessity.

## AWS CDN Link and rest

This is the bucket's direct Endpoint "http://project-api-websites.s3-website.ap-south-1.amazonaws.com" which is blocked. CDN link is below:

CDN - "http://d194h18bge09ch.cloudfront.net/index.html"

Learned how to:

1.) AJAX programming and all it's concepts.

2.) Understood and practiced Bootstrap 4 framework for CSS.

3.) Understanding APIs and JSON data.

(All used AWS services expire around end of 2021 for this project)
