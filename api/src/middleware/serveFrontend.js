import express from 'express';
import { join } from 'path';

// Middleware which serves a static single page application.
export const serveFrontend = (publicFolder) => {
  const indexFilePath = join(publicFolder, 'index.html');

  return [
    // serve static files from the public folder.
    express.static(publicFolder),
    // if the requested route doesn't match a file, then serve the index and
    // let the SPA handle the routing.
    (req, res, next) => res.sendFile(indexFilePath),
  ];
};
