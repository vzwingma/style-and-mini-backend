import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import {
  getSignedUrl,
} from "@aws-sdk/s3-request-presigner";
import https from "node:https";
import { ApiVerbsEnum } from "../constants/APIconstants";


const bucketName = process.env.UploadBucket || 'style-mini-app-images';
const region = process.env.AWS_REGION || 'eu-west-3';


export const createPresignedS3Url = (key : string) => {
  const client = new S3Client({region: region});
  const command = new PutObjectCommand({ 
    Bucket      : bucketName, 
    Key         : process.env.NODE_ENV+key,
    ContentType : 'image/jpeg'
});
  return getSignedUrl(client, command, { expiresIn: 3600 });
};

/**
 * Make a PUT request to the provided URL.
 *
 * @param {string} url
 * @param {string} data
 */
export const putToS3 = (url : string, data : any) => {
  return new Promise((resolve, reject) => {
    const req = https.request(
      url,
      { 
        method: ApiVerbsEnum.PUT, 
        headers: { "Content-Length": new Blob([data]).size } 
    },
      (res) => {
        let responseBody = "";
        res.on("data", (chunk) => {
          responseBody += chunk;
        });
        res.on("end", () => {
          if ((res.statusCode ?? 0) >= 200 && (res.statusCode ?? 0) <= 299) {
            resolve({ message : "Données chargée avec succès sur le bucket S3"});
          } else {
            reject({ message : "Erreur lors du chargement sur le bucket S3 : ",
                     response : responseBody});
          }
        });
      },
    );
    req.on("error", (err) => {
        reject({ message : "Erreur lors du chargement sur le bucket S3 : ",
                 response : err});
    });
    req.write(data);
    req.end();
  });
};