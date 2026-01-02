import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Field } from '@gnwebsoft/ui';

import AddIcon from '@mui/icons-material/Add';
import { TabPanel, TabContext } from '@mui/lab';
import ManageSearchIcon from '@mui/icons-material/ManageSearch';
import {
  Box,
  Tab,
  Card,
  Tabs,
  Button,
  Drawer,
  Divider,
  CardHeader,
  Typography,
  IconButton,
  CardContent,
} from '@mui/material';

import FormView, { LanguageOptions } from './Form';
import { useListQuery, useTLanguageOptions } from '../api/hooks';
import TableFieldView from './TableFieldForm';
import { useLocaleStore } from '../api/store';

import type { FilterModel, ListDisplay } from '../types';
import { DashboardContent } from '@minimal/layouts/dashboard';
import { Iconify } from '@minimal/components/iconify';
import { CustomBreadcrumbs } from '@minimal/components/custom-breadcrumbs';

export const ListComponent = () => {
  const {
    tabValue,
    setTabValue,
    setOpenFormDrawer,
    openFormDrawer,
    postModel: { filterModel },
    handleFiltering,
    postModel,
  } = useLocaleStore();

  const { control, watch } = useForm<FilterModel>({
    defaultValues: { ...filterModel },
  });

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  useEffect(() => {
    const Filter = watch(values => {
      handleFiltering(values);
    });
    return () => Filter.unsubscribe();
  }, [watch, handleFiltering]);

  const { data } = useListQuery(postModel);

  return (
    <DashboardContent>
      <CustomBreadcrumbs heading='Locale' sx={{ mb: 4 }} />

      <Card sx={{ borderRadius: 0, height: '43rem' }}>
        <CardHeader
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            p: '1rem',
            alignItems: 'center',
            '.MuiCardHeader-action': {
              margin: 0,
              alignSelf: 'center',
            },
          }}
          title={
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 0.5,
                }}
              >
                <ManageSearchIcon sx={{ color: 'primary.main', height: '2.5rem' }} />
                <Typography variant='h5' sx={{ color: 'primary.main', fontWeight: 'bold' }}>
                  Locales
                </Typography>
              </Box>
              <Box
                sx={{ display: 'flex', justifyContent: 'flex-end', gap: 3, alignItems: 'center' }}
              >
                <Box sx={{ minWidth: '200px' }}>
                  <Field.Select
                    control={control}
                    name='Language'
                    label='Language'
                    placeholder='Select Language'
                    options={LanguageOptions || []}
                    size='small'
                    fullWidth
                  />
                </Box>
                <Box>
                  <Button
                    startIcon={<AddIcon />}
                    onClick={() => setOpenFormDrawer(true)}
                    variant='outlined'
                    color='primary'
                  >
                    Create
                  </Button>
                  <Drawer
                    anchor='right'
                    open={openFormDrawer}
                    onClose={() => {
                      setOpenFormDrawer(false);
                    }}
                    PaperProps={{
                      sx: {
                        width: { xs: 300, sm: 550, md: 550 },
                        display: 'flex',
                        flexDirection: 'column',
                        height: '100vh',
                      },
                    }}
                  >
                    <Box>
                      <Box
                        sx={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          px: 3,
                          py: 1.5,
                        }}
                      >
                        <Typography variant='h6'>Add Locale</Typography>
                        <IconButton
                          onClick={() => {
                            setOpenFormDrawer(false);
                          }}
                        >
                          <Iconify icon='fluent-mdl2:cancel' />
                        </IconButton>
                      </Box>
                      <Divider />
                    </Box>
                    <FormView />
                  </Drawer>
                </Box>
              </Box>
            </Box>
          }
        />

        <Divider />

        <CardContent sx={{ display: 'flex', width: '100%', overflow: 'auto' }}>
          <TabContext value={tabValue}>
            <Tabs
              value={tabValue}
              onChange={handleTabChange}
              orientation='vertical'
              sx={{
                display: 'flex',
                width: '15rem',
                height: '35rem',
                pr: '1rem',
                overflowY: 'auto',
                borderRight: theme => `1px solid ${theme.palette.divider}`,
                '& .MuiTabs-flexContainer': { gap: 0 },
              }}
            >
              {data?.Data?.map((row: ListDisplay, index: number) => (
                <Tab
                  key={row.LocaleID}
                  value={index}
                  label={row.TableName.split('.')[1] || row.TableName}
                  sx={{
                    fontWeight: tabValue === index ? 'bold' : 'normal',
                    fontSize: tabValue === index ? '1.05rem' : '0.95rem',
                    justifyContent: 'flex-start',
                    display: 'flex',
                    overflowWrap: 'anywhere',
                    textAlign: 'start',
                  }}
                />
              ))}
            </Tabs>

            {data?.Data?.map((row: ListDisplay, index: number) => (
              <TabPanel key={row.LocaleID} value={index} sx={{ flex: 1, py: 0 }}>
                <TableFieldView
                  localeID={row.LocaleID}
                  field={JSON.parse(row?.Value ?? '{}')}
                  language={row?.Language}
                />
              </TabPanel>
            ))}
          </TabContext>
        </CardContent>
      </Card>
    </DashboardContent>
  );
};
