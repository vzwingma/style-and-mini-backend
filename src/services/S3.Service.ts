import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import {
  getSignedUrl,
} from "@aws-sdk/s3-request-presigner";
import https from "node:https";
import { ApiVerbsEnum } from "../constants/APIconstants";


const bucketName = process.env.UploadBucket || 'style-mini-app-images';
const region = process.env.AWS_REGION || 'eu-west-3';


/**
 * Génère une URL pré-signée pour télécharger un objet dans un bucket S3.
 *
 * @param key - La clé de l'objet dans le bucket S3. Elle sera préfixée par l'environnement actuel (NODE_ENV).
 * @returns Une promesse qui résout à une URL pré-signée valide pendant 1 heure (3600 secondes).
 *
 * @remarks
 * Cette fonction utilise le client AWS S3 pour créer une commande `PutObjectCommand` 
 * et génère une URL pré-signée à l'aide de `getSignedUrl`.
 *
 */
export const createPresignedS3Url = (key : string) => {
  const client = new S3Client({region: region});
  const command = new PutObjectCommand({ 
    Bucket      : bucketName, 
    Key         : process.env.NODE_ENV+ "/" + key,
    ContentType : 'image/jpeg'
});
  return getSignedUrl(client, command, { expiresIn: 3600 });
};

/**
 * Envoie des données vers un bucket S3 via une requête HTTP PUT.
 *
 * @param url - L'URL du bucket S3 où les données doivent être envoyées.
 * @param data - Les données à envoyer au bucket S3.
 * @returns Une promesse qui se résout avec un message de succès si les données
 *          sont correctement chargées, ou qui se rejette avec un message d'erreur
 *          et la réponse correspondante en cas d'échec.
 *
 * @throws {Error} - En cas d'erreur réseau ou si le statut HTTP de la réponse
 *                   n'est pas compris entre 200 et 299.
 */
export const putToS3 = (url : string, data : Buffer) => {
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