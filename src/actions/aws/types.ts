export type GetSignedURLParams = {
    fileType: string;
    fileSize: number;
    checksum: string;
    objectDirectory?: string;
    objectKey?: string;
};
export type GetSignedURLResult =
    | {
          success: false;
          message: string;
      }
    | {
          success: true;
          url: string;
      };
