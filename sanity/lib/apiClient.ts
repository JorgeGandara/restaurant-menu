import { createClient } from '@sanity/client';
import { apiVersion, dataset, projectId, sanityToken } from '../env'


export const sanityClient = createClient({
  projectId: projectId,
  dataset: dataset,     
  apiVersion: apiVersion,  
  useCdn: false,             
  token: sanityToken, 
});
