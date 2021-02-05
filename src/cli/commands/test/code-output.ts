import * as Sarif from 'sarif';
import chalk from 'chalk';

export function getCodeDisplayedOutput(codeTest: Sarif.Log, testedInfoText, meta, prefix) {
  const results = codeTest.runs[0].results;

  // TODO: add validations on res object so we won't need to use exclamation marks
  const issues: string = results!.reduce((acc, res) => {
    const location = res!.locations![0].physicalLocation!;
    const severity = sarifToSeverityLevel(res.level!);
    const ruleIdseverityText = severitiesColourMapping[severity].colorFunc(
      `  ${res.ruleId} [${severity} Severity]`,
    );
    acc += `${ruleIdseverityText} in ${location.artifactLocation!.uri!}, line ${location.region!.startLine}
    ${res.message.markdown} \n`;
    return acc;
  }, '');
  return prefix + issues + '\n\n' + meta + '\n\n' + testedInfoText;
}

function sarifToSeverityLevel(
  sarifConfigurationLevel: Sarif.ReportingConfiguration.level,
): string {
  const severityLevel = {
    note: 'Low',
    warning: 'Medium',
    error: 'High',
  };

  return severityLevel[sarifConfigurationLevel] as string;
}

const severitiesColourMapping = {
  Low: {
    colorFunc(text) {
      return chalk.blueBright(text);
    },
  },
  Medium: {
    colorFunc(text) {
      return chalk.yellowBright(text);
    },
  },
  High: {
    colorFunc(text) {
      return chalk.redBright(text);
    },
  },
};
