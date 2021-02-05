import * as codeClient from '@snyk/code-client';
import { api } from '../../lib/api-token';
import * as config from '../config';
import spinner = require('../spinner');
import * as analytics from '../analytics';

// codeClient.emitter.on('scanFilesProgress', (processed: number) => {
//   console.log(`Indexed ${processed} files`);
// });

// /** Bundle upload process is started with provided data */
// codeClient.emitter.on(
//   'uploadBundleProgress',
//   (processed: number, total: number) => {
//     console.log(`Upload bundle progress: ${processed}/${total}`);
//   },
// );

// /** Receives an error object and logs an error message */
// codeClient.emitter.on('sendError', (error) => {
//   console.log(error);
// });

export async function getCodeAnalysisAndParseResults(
  spinnerLbl,
  root,
  options,
) {
  await spinner.clear<void>(spinnerLbl)();
  await spinner(spinnerLbl);

  // analytics.add('Code type', true);
  const res = await getCodeAnalysis(root);
  // console.log('>>>>>>>>>>>>>>>>>>>>>>');
  // console.log(JSON.stringify(res.sarifResults?.runs, null, 4));
  // console.log('<<<<<<<<<<<<<<<<<<<<<<');

  return await parseCodeTestResult(res, options);
}
export async function getCodeAnalysis(root) {
  const baseURL = config.SNYKCODE_PROXY;
  const sessionToken = api();
  return await codeClient.analyzeFolders(baseURL, sessionToken, false, 1, [
    root,
  ], undefined, undefined, undefined, true);
}

export function parseCodeTestResult(result, options) {

  // we should filtering
  return result.sarifResults;
}
