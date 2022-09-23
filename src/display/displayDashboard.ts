import chalk from 'chalk';
import { ChecksResultsByCategory } from '../types';

type ScoresByCategory = { label: string; score: number }[];

const getBgColorFromScore = (score: number) => {
  if (score > 75) return chalk.bgGreen;
  if (score > 50) return chalk.bgYellow;

  return chalk.bgRed;
};

const chalkBgGrey = () => chalk.bgRgb(40, 40, 40);

const generateSpaces = (width: number): string => {
  return new Array(width + 1).join(' ');
};

const centerText = (text: string | number, width: number): string => {
  const remainingSpaces = width - text.toString().length;
  const spacesLeft = generateSpaces(
    Math.floor(remainingSpaces / 2) + (remainingSpaces % 2),
  );
  const spacesRight = generateSpaces(Math.floor(remainingSpaces / 2));

  return `${spacesLeft}${text}${spacesRight}`;
};

const drawHorizontalBar = (score: number, dashboardWidth: number): void => {
  const barWidth = Math.floor((score * dashboardWidth) / 100);
  const barHeight = 3;
  let display = '';
  for (let i = 0; i < barHeight; i++) {
    if (i === Math.floor(barHeight / 2)) {
      const overallScore = ' Overall score';
      const scorePercent = `${score}% `;

      display = display.concat(
        chalk.bold(getBgColorFromScore(score)(overallScore.slice(0, barWidth))),
      );
      display = display.concat(
        chalk.bold(
          chalkBgGrey()(overallScore.slice(barWidth, overallScore.length)),
        ),
      );
      display = display.concat(
        chalk.bold(
          getBgColorFromScore(score)(
            generateSpaces(
              Math.min(
                Math.max(barWidth - overallScore.length, 0),
                dashboardWidth - scorePercent.length - overallScore.length,
              ),
            ),
          ),
        ),
      );
      display = display.concat(
        chalkBgGrey()(
          generateSpaces(
            Math.max(
              dashboardWidth -
                scorePercent.length -
                Math.max(overallScore.length, barWidth),
              0,
            ),
          ),
        ),
      );
      display = display.concat(
        chalk.bold(
          getBgColorFromScore(score)(
            scorePercent.slice(
              0,
              Math.max(barWidth - (dashboardWidth - scorePercent.length), 0),
            ),
          ),
        ),
      );
      display = display.concat(
        chalk.bold(
          chalkBgGrey()(
            scorePercent.slice(
              Math.max(barWidth - (dashboardWidth - scorePercent.length), 0),
              scorePercent.length,
            ),
          ),
        ),
      );
    } else {
      display = display.concat(
        getBgColorFromScore(score)(generateSpaces(barWidth)),
      );
      display = display.concat(
        chalkBgGrey()(generateSpaces(dashboardWidth - barWidth)),
      );
    }
    display = display.concat('\n');
  }
  console.log(display + '\n');
};

const drawVerticalBars = (
  data: ScoresByCategory,
  barsWidth: number,
  barsSpacing: number,
): void => {
  let display = '';
  for (let i = 100; i > 0; i -= 10) {
    for (const [index, { score, label }] of data.entries()) {
      const string =
        i === 100
          ? centerText(label, barsWidth)
          : i === 10
          ? centerText(`${score}%`, barsWidth)
          : generateSpaces(barsWidth);
      if (score >= i) {
        display = display.concat(
          getBgColorFromScore(score)(chalk.bold(string)),
        );
      } else {
        display = display.concat(chalkBgGrey()(chalk.bold(string)));
      }
      if (index === data.length - 1) {
        continue;
      }
      display = display.concat(generateSpaces(barsSpacing));
    }
    display = display.concat('\n');
  }
  console.log(display);
};

const drawLegend = (): void => {
  console.log(
    'Color scale: ' +
      chalk.red('◼') +
      ' 0-50  ' +
      chalk.yellow('◼') +
      ' 50-75  ' +
      chalk.green('◼') +
      ' 75-100',
  );
};

export const displayDashboard = (
  checksResultsByCategory: ChecksResultsByCategory,
): void => {
  console.log('\n\n');
  const scoresByCategory = Object.entries(checksResultsByCategory).map(
    ([category, score]) => ({ label: category, score }),
  );
  const windowWidth = process.stdout.columns;
  const nbOfBars = scoresByCategory.length;
  const nbOfSpaces = nbOfBars - 1;

  const barsWidth = Math.max(
    Math.floor(windowWidth / (nbOfBars + 2)),
    Math.max(...scoresByCategory.map(({ label }) => label.length)),
    '100%'.length,
  );
  const barsSpacing = Math.max(
    Math.floor((windowWidth - barsWidth * nbOfBars) / nbOfSpaces),
    1,
  );
  const dashboardWidth = nbOfBars * barsWidth + nbOfSpaces * barsSpacing;
  if (dashboardWidth > windowWidth) {
    return console.log(
      chalk.red(
        chalk.bold('⚠️  Terminal is too small to display results dashboard'),
      ),
    );
  }

  console.log(chalk.bold(centerText('🛡  GUARDIAN 🛡', dashboardWidth)) + '\n');
  console.log(
    chalk.bold(centerText('--- Your checks results ---', dashboardWidth)),
  );
  console.log(
    chalk.gray(centerText('(More details above)', dashboardWidth)) + '\n\n',
  );

  const overallScore = Math.floor(
    scoresByCategory.reduce((total, { score }) => total + score, 0) / nbOfBars,
  );
  drawHorizontalBar(overallScore, dashboardWidth);

  const integerScoresByCategory = scoresByCategory.map(({ label, score }) => ({
    label,
    score: Math.floor(score),
  }));
  drawVerticalBars(integerScoresByCategory, barsWidth, barsSpacing);
  drawLegend();
};
