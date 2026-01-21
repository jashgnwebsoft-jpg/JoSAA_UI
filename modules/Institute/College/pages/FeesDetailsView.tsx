import { DataModal, SectionBox } from '@core/components';
import { withDataModal } from '@core/components/WithRef';
import { fNumber } from '@core/utils/format-number';
import { LabelText } from '@gnwebsoft/ui';
import { LoadingScreen } from '@minimal/components/loading-screen';
import { useTranslate } from '@minimal/utils/locales';

import { useFeesQuery } from '@modules/Institute/Fees/api/hooks';
import { FeesMoreDeatilsResponse } from '@modules/Institute/Fees/types';
import { Divider, Grid } from '@mui/material';

type Props = {
  collegeID: string | undefined;
  open: boolean;
  onClose: () => void;
};

const FeesDeatilsView = (props: Props) => {
  const { t } = useTranslate();
  const { collegeID, open, onClose } = props;
  const { data } = useFeesQuery(collegeID);

  return (
    <DataModal
      Component={DeatilsView}
      modalTitle={t('Institute.Fees.FeesDetails.Label')}
      data={data}
      open={open}
      mode={'view'}
      handleClose={onClose}
      maxWidth='md'
    />
  );
};

export default FeesDeatilsView;

const DeatilsView = withDataModal<FeesMoreDeatilsResponse[]>(({ data }) => {
  const { t } = useTranslate();

  const semesterFees = data?.filter(item => item.isAnnualFees === false);

  const yearFees = data?.filter(item => item.isAnnualFees === true);
  if (!data) {
    <LoadingScreen />;
  }
  return (
    <>
      <SectionBox title={t('Institute.Fees.SemesterFees.Label')}>
        {semesterFees?.map(item => (
          <LabelText
            key={item.FeesID}
            label={item.FeesHeadTitle!}
            value={fNumber(item.HeadWiseFees)}
            containerSize={{ xs: 12, sm: 12, md: 6 }}
            gridSize={{
              labelSize: { xs: 9, sm: 9, md: 9 },
              valueSize: { xs: 3, sm: 3, md: 3 },
            }}
          />
        ))}

        {semesterFees && semesterFees.length > 0 && (
          <>
            <Grid size={{ xs: 12, md: 6 }} />
            <LabelText
              label={t('Institute.Fees.TotalSemesterFees.Label')}
              value={fNumber(semesterFees[0].SemesterWiseTotalFees)}
              labelSx={{ fontWeight: 'bold' }}
              containerSize={{ xs: 6, sm: 6, md: 6 }}
              gridSize={{
                labelSize: { xs: 9, sm: 9, md: 9 },
                valueSize: { xs: 3, sm: 3, md: 3 },
              }}
            />
          </>
        )}
      </SectionBox>

      <SectionBox title={t('Institute.Fees.AnnualFees.Label')}>
        {yearFees?.map(item => (
          <LabelText
            key={item.FeesID}
            label={item.FeesHeadTitle!}
            containerSize={{ xs: 12, sm: 12, md: 6 }}
            value={fNumber(item.HeadWiseFees)}
            gridSize={{
              labelSize: { xs: 9, sm: 9, md: 9 },
              valueSize: { xs: 3, sm: 3, md: 3 },
            }}
          />
        ))}

        {yearFees && yearFees.length > 0 && (
          <LabelText
            label={t('Institute.Fees.TotalAnnualFees.Label')}
            value={fNumber(yearFees[0].YearWiseTotalFees)}
            labelSx={{ fontWeight: 'bold' }}
            containerSize={{ xs: 12, sm: 12, md: 6 }}
            gridSize={{
              labelSize: { xs: 9, sm: 9, md: 9 },
              valueSize: { xs: 3, sm: 3, md: 3 },
            }}
          />
        )}
      </SectionBox>
    </>
  );
});
