import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import {
  getSignedUrl,
} from "@aws-sdk/s3-request-presigner";


const bucketName = process.env.UploadBucket ?? 'style-mini-app-images';
const region = process.env.AWS_REGION       ?? 'eu-west-3';


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
    ContentType : 'image/jpg'
});
  return getSignedUrl(client, command, { expiresIn: 3600 });
};