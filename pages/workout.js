import { expectLoggedIN } from "../utils/checkAuth";
import style from '../styles/workout.module.css'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import { useSelector } from 'react-redux'
import Link from 'next/link'

const Workout = () => {
    expectLoggedIN();
    const token = useSelector(state => state.token.value)

    return (
        <div className={style.workout}>
            <Link href={`/${token.login}/workout-results`}>
                <a>
                    <Card sx={{ maxWidth: 345, margin: 'auto', width: '100%' }}>
                        <CardActionArea>
                            <CardMedia
                                component="img"
                                height="140"
                                image="https://i.pinimg.com/originals/18/0f/cc/180fcc6200789061998413b2141bd1cb.jpg"
                                alt="green iguana"
                            />
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="div">
                                    Results
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Add results for workout plan.
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                    </Card>
                </a>
            </Link>
            <Link href={`/${token.login}/workout-plans`}>
                <a>
                    <Card sx={{ maxWidth: 345, width: '100%' }}>
                        <CardActionArea>
                            <CardMedia
                                component="img"
                                height="140"
                                image="https://i.pinimg.com/originals/18/0f/cc/180fcc6200789061998413b2141bd1cb.jpg"
                                alt="green iguana"
                            />
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="div">
                                    Plans
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Create your own workout plan.
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                    </Card>
                </a>
            </Link>
        </div>
    );
};

export default Workout;
