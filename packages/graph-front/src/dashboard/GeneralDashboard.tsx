import { ArnService } from '@sls-mentor/arn';
import { Curve } from './Curve';
import { getAmountAndUnit, getServiceColor } from './utils';

interface Props {
  bars1: {
    data: { label: string; value: number }[];
    label: string;
    unit: string;
  };
  bars2?: {
    data: { label: string; value: number }[];
    label: string;
    unit: string;
  };
  bars3?: {
    data: { label: string; value: number }[];
    label: string;
    unit: string;
  };
  aggregate1: { label: string; value: number; unit: string };
  aggregate2: { label: string; value: number; unit: string };
  service: ArnService;
  label: string;
  unit?: string;
}

export const GeneralDashboard = ({
  bars1,
  bars2,
  bars3,
  aggregate1,
  aggregate2,
  service,
  label,
}: Props): JSX.Element => {
  const color = getServiceColor(service);

  const { value: aggregate1Value, unit: aggregate1Unit } =
    getAmountAndUnit(aggregate1);
  const { value: aggregate2Value, unit: aggregate2Unit } =
    getAmountAndUnit(aggregate2);

  return (
    <>
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-around',
          width: '100%',
          height: '50%',
          gap: '1em',
          position: 'relative',
        }}
      >
        <div
          style={{
            width: '50%',
            color: 'white',
            display: 'flex',
            flexDirection: 'column',
            height: '100%',
          }}
        >
          <h1 style={{ fontSize: '4em', fontWeight: '600', color }}>
            {service.toUpperCase()}
          </h1>
          <h1 style={{ fontSize: '2em', fontWeight: '600', color: 'white' }}>
            {label.toUpperCase()}
          </h1>
          <div
            style={{
              display: 'flex',
              textAlign: 'center',
              width: '100',
              justifyContent: 'space-around',
              alignItems: 'center',
              flexGrow: 1,
            }}
          >
            <div>
              <h1 style={{ fontSize: '8em', fontWeight: '600', color }}>
                {aggregate1Value}
              </h1>
              <h2 style={{ fontSize: '1em' }}>
                {aggregate1.label}
                {aggregate1Unit !== '' ? ` (${aggregate1Unit})` : ''}
              </h2>
            </div>
            <div>
              <h1 style={{ fontSize: '8em', fontWeight: '600', color }}>
                {aggregate2Value}
              </h1>
              <h2 style={{ fontSize: '1em' }}>
                {aggregate2.label}
                {aggregate2Unit !== '' ? ` (${aggregate2Unit})` : ''}
              </h2>
            </div>
          </div>
        </div>
        <Curve
          labels={bars1.data.map(({ label }) => label)}
          values={bars1.data.map(({ value }) => value)}
          barsColor={color}
          title={bars1.label}
          width="50%"
          unit={bars1.unit}
        />
      </div>
      {(bars2 !== undefined || bars3 !== undefined) && (
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-around',
            width: '100%',
            height: '50%',
            gap: '1em',
          }}
        >
          {bars2 !== undefined && (
            <Curve
              labels={bars2.data.map(({ label }) => label)}
              values={bars2.data.map(({ value }) => value)}
              barsColor={color}
              title={bars2.label}
              width="50%"
              unit={bars2.unit}
            />
          )}
          {bars3 !== undefined && (
            <Curve
              labels={bars3.data.map(({ label }) => label)}
              values={bars3.data.map(({ value }) => value)}
              barsColor={color}
              title={bars3.label}
              width="50%"
              unit={bars3.unit}
            />
          )}
        </div>
      )}
    </>
  );
};
