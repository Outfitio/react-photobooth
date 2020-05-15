# React Photobooth & Avatar Generator

<p align="center">
  <img width="50%" src="https://media.giphy.com/media/l0HlDwtycArz4uxby/giphy.gif" />
</p>

A simple boilerplate React application using Cloudinary and Outfit to allow you to create your own virtual photobooths. More to come.

## Getting Started

The photobooth was created using [Create React App](https://github.com/facebook/create-react-app) so all of the standard things apply.

### Installation

Super simple, install the dependencies in the project directory.

```
cd react-photobooth
```

```
yarn install
```

### Running the application

```
yarn-start
```

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

## Deployment

```
yarn build
```

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

## Built With

- [Create React App](https://github.com/facebook/create-react-app) - Simple react app framework
- [Styled Components](https://styled-components.com/) - Styled with love using CSS-in-JS
- [Outfit](https://outfit.io/) - Image generation API
- [Cloudinary](https://cloudinary.com/) - Client-side image uploading API (see [here](#cloudinary-unsigned-uploading) for more)
- [EXIFjs](https://github.com/exif-js/exif-js) - Image library to read the output the correct orientation of an image.
- [Axios](https://github.com/axios/axios) - Handling API requests

## Outfit Image Generation

To generate the images we're using Outfit's Create API, which is currently still a work in progress. More to come soon.

## Cloudinary Unsigned Uploading

The photobooth is currently using Cloudinary's [face-detection transformations](https://cloudinary.com/documentation/javascript_image_and_video_upload) to detect and centre faces to the artwork.

For this, we have used the unsigned [Upload API](https://cloudinary.com/documentation/upload_images#unsigned_upload) to push images to Cloudinary. To get started do the following:

1. Create an account
2. Create an unsigned upload preset from `Account Settings > Upload`
   - Signing Method: `unsigned`
   - Delivery Type: `Upload`
   - Access Mode: `Public`
3. Copy the Upload Preset & Cloud Name
4. Paste those into the `cloudinaryUploadPreset` and `cloudinaryCloudName`in the [providers > appState.js](/src/providers/appState.js) file

### Helpful reading

- https://cloudinary.com/documentation/upload_presets
- https://cloudinary.com/documentation/upload_images#unsigned_upload
- https://cloudinary.com/documentation/face_detection_based_transformations
- https://cloudinary.com/blog/direct_upload_made_easy_from_browser_or_mobile_app_to_the_cloud

## License

This project is licensed under the MIT License - see the LICENSE.md file for details
