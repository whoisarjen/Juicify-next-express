import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import CircularWithLabel from "./circular";
import CircularWithLabelReverse from "./circularReversed";
import styled from "styled-components";
import { useDiagramProps } from './useDiagram';

const Table = styled.table`
    font-size: 0.875rem;
    text-align: left;
    ${this} td{
        text-align: right;
    }
    ${this} tr td:first-of-type{
        font-weight: bold;
    }
`

const Diagrams = ({ array, user, value, handleChange, object, t }: useDiagramProps) => {
    return (
        <div style={{ width: '100%' }}>
            <Box sx={{ width: '100%', display: 'grid', marginBottom: '24px' }}>
                <TabContext value={value}>
                    <Box>
                        <TabList
                            onChange={handleChange}
                            value={value}
                            indicatorColor="primary"
                            textColor="inherit"
                            variant="fullWidth"
                            sx={{ marginBottom: '24px' }}
                        >
                            <Tab label={t('consumed')} value="1" key={1} />
                            <Tab label={t('remaining')} value="2" key={2} />
                        </TabList>
                    </Box>
                    <TabPanel value="1" sx={{ width: '100%', display: 'grid', gridTemplateColumns: 'calc(50% - 12px) 12px auto', padding: '0 !important' }}>
                        <div>
                            <CircularWithLabel array={array} user={user} />
                        </div>
                        <div />
                        <Table>
                            <tbody>
                                {
                                    Object.keys(object).map(x =>
                                        <tr key={x}>
                                            <th>{t(x)}:</th>
                                            <td>{Math.round(object[x].value * 10) / 10}g</td>
                                            <td>{Math.round(object[x].macro * 10) / 10}g</td>
                                        </tr>
                                    )
                                }
                            </tbody>
                        </Table>
                    </TabPanel>
                    <TabPanel value="2" sx={{ width: '100%', display: 'grid', gridTemplateColumns: 'calc(50% - 12px) 12px auto', padding: '0 !important' }}>
                        <div>
                            <CircularWithLabelReverse array={array} user={user} />
                        </div>
                        <div />
                        <Table>
                            <tbody>
                                {
                                    Object.keys(object).map(x =>
                                        <tr key={x}>
                                            <th>{t(x)}:</th>
                                            <td>{Math.round((object[x].macro - object[x].value) * 10) / 10}g</td>
                                            <td>{Math.round(object[x].macro * 10) / 10}g</td>
                                        </tr>
                                    )
                                }
                            </tbody>
                        </Table>
                    </TabPanel>
                </TabContext>
            </Box>
        </div >
    )
}

export default Diagrams;