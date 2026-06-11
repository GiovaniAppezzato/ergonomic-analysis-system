import { Text, View } from "react-native";
import Svg, { Path, Text as SvgText } from "react-native-svg";

import { AnalysisResult } from "@/interfaces/analysis";

interface AnalysisResultChartProps {
  result: AnalysisResult[];
}

interface Point {
  x: number;
  y: number;
}

const CHART_SIZE = 148;
const CHART_CENTER = CHART_SIZE / 2;
const CHART_RADIUS = CHART_SIZE / 2;
const DEGREES_PER_PERCENT = 3.6;
const MIN_LABEL_PERCENTAGE = 10;
const LABEL_RADIUS_RATIO = 0.62;

function getPoint(angle: number, radius = CHART_RADIUS): Point {
  const radians = ((angle - 90) * Math.PI) / 180;
  return {
    x: CHART_CENTER + radius * Math.cos(radians),
    y: CHART_CENTER + radius * Math.sin(radians),
  };
}

function getSlicePath(startAngle: number, endAngle: number): string {
  const start = getPoint(startAngle);
  const end = getPoint(endAngle);
  const largeArcFlag = endAngle - startAngle > 180 ? 1 : 0;

  return [
    `M ${CHART_CENTER} ${CHART_CENTER}`,
    `L ${start.x} ${start.y}`,
    `A ${CHART_RADIUS} ${CHART_RADIUS} 0 ${largeArcFlag} 1 ${end.x} ${end.y}`,
    "Z",
  ].join(" ");
}

function getMiddleAngle(result: AnalysisResult[], index: number): number {
  const previousPercentage = result
    .slice(0, index)
    .reduce((total, current) => total + current.percentage, 0);
  return previousPercentage * DEGREES_PER_PERCENT + result[index].percentage * (DEGREES_PER_PERCENT / 2);
}

interface ChartSlicesProps {
  result: AnalysisResult[];
}

function ChartSlices({ result }: ChartSlicesProps) {
  let currentAngle = 0;

  return (
    <>
      {result.map((item) => {
        const startAngle = currentAngle;
        const endAngle = startAngle + item.percentage * DEGREES_PER_PERCENT;
        currentAngle = endAngle;

        return (
          <Path
            key={item.key}
            d={getSlicePath(startAngle, endAngle)}
            fill={item.color}
            stroke="#FFFFFF"
            strokeWidth={1}
          />
        );
      })}
    </>
  );
}

interface ChartLabelsProps {
  result: AnalysisResult[];
}

function ChartLabels({ result }: ChartLabelsProps) {
  return (
    <>
      {result.map((item, index) => {
        if (item.percentage < MIN_LABEL_PERCENTAGE) return null;

        const middleAngle = getMiddleAngle(result, index);
        const labelPoint = getPoint(middleAngle, CHART_RADIUS * LABEL_RADIUS_RATIO);

        return (
          <SvgText
            key={item.key}
            x={labelPoint.x}
            y={labelPoint.y + 4}
            fill="#FFFFFF"
            fontFamily="Inter-Medium"
            fontSize={12}
            textAnchor="middle"
          >
            {item.percentage}%
          </SvgText>
        );
      })}
    </>
  );
}

interface ChartLegendProps {
  result: AnalysisResult[];
}

function ChartLegend({ result }: ChartLegendProps) {
  return (
    <View className="ml-5 flex-1">
      {result.map((item) => (
        <View key={item.key} className="mb-3 flex-row items-center">
          <View
            className="mr-2.5 h-3.5 w-3.5 rounded"
            style={{ backgroundColor: item.color }}
          />
          <Text
            className="flex-1 font-sans text-sm text-[#262626]"
            numberOfLines={1}
          >
            {item.label}
          </Text>
        </View>
      ))}
    </View>
  );
}

export function AnalysisResultChart({ result }: AnalysisResultChartProps) {
  return (
    <View className="mt-5 flex-row items-center">
      <Svg width={CHART_SIZE} height={CHART_SIZE}>
        <ChartSlices result={result} />
        <ChartLabels result={result} />
      </Svg>

      <ChartLegend result={result} />
    </View>
  );
}