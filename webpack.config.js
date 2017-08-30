const path = require('path');
var SuppressChunksPlugin = require('suppress-chunks-webpack-plugin').default;
var LiveReloadPlugin = require('webpack-livereload-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const extractHTML = new ExtractTextPlugin('[name].html');

module.exports = {
  entry: {
  	"index": './html/index.html'
  },
  output: {
  	filename: '[name].js',
    path: path.resolve(__dirname, 'generate')
  },
  module: {
        rules: [
        {
            test: /\.less$/,
        	use:[
            	{
                    loader: "file-loader",
                    options: {
                        name: "stylesheets/[name]-less.css",
                    },
                },
                {
                    loader: "extract-loader",
                    options: {
                        publicPath: "../",
                    }
                },{
	                loader: "css-loader" // translates CSS into CommonJS
	            }, {
	                loader: "less-loader" // compiles Less to CSS
	            }
            ],
        },
        {
            test: /\.css$/,
            use: [
                {
                    loader: "file-loader",
                    options: {
                        name: "stylesheets/[name]-css.css",
                    },
                },
                {
                    loader: "extract-loader",
                    options: {
                        publicPath: "../",
                    }
                },
                {
                    loader: "css-loader",
                },
            ],
        },
        {
            test: /\.scss$/,

        	use:[
        		{
                    loader: "file-loader",
                    options: {
                        name: "stylesheets/[name]-sass.css",
                    },
                },
                {
                    loader: "extract-loader",
                    options: {
                        publicPath: "../",
                    }
                },
            	{
	                loader: "css-loader"
	            }, {
	                loader: "sass-loader"
	            }
	        ]
        },
        {
			test: /\.styl$/,
			use:[
				{
                    loader: "file-loader",
                    options: {
                        name: "stylesheets/[name]-styl.css",
                    },
                },
                {
                    loader: "extract-loader",
                    options: {
                        publicPath: "../",
                    }
                },
				{
	                loader: "css-loader"
	            }, {
	                loader: "stylus-loader"
	            }
			]
		},
		{
			test: /\.(gif|png|jpe?g)$/i,
			use: [
			  {
			  	loader:'file-loader',
			  	options:{
			  		name:'[path][name].[ext]'
			  	}
			  },
			  {
			    loader: 'image-webpack-loader',
			    options: {
			      gifsicle: {
			        interlaced: false,
			      },
			      optipng: {
			        optimizationLevel: 7,
			      },
			      pngquant: {
			        quality: '65-90',
			        speed: 4
			      },
			      mozjpeg: {
			        progressive: true,
			        quality: 90
			      }
			    }
			  }
			]
		},
        {
            test: /\.(eot|svg|ttf|woff|woff2)$/,
            use: [
                {
                    loader: "file-loader",
                    options: {
                        name: "[path][name].[ext]",
                    },
                }
            ],
        },
        {
          test: /\.(html)$/,
          use: extractHTML.extract(
                {
                    use:[ {
                        loader: 'html-loader',
                        options:{
                            ignoreCustomFragments: [/\{\{.*?}}/],
                            root: path.resolve(__dirname, 'assets'),
                            attrs: ['img:src', 'link:href'],
                            interpolate: true,              
                        }
                    }]
                }
            )
        }
        ]
    },
	watch: true,
 	plugins: [
        extractHTML,
		new SuppressChunksPlugin(["index"], { filter: /\.js$/ }),
		new LiveReloadPlugin()
	]
};
