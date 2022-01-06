import { FunctionComponent, useState, useEffect } from "react";
import TextField from '@mui/material/TextField';
import { useAppSelector } from "../../hooks/useRedux";
import MobileDatePicker from '../common/MobileDatePicker'
import InputAdornment from '@mui/material/InputAdornment';
import useTranslation from "next-translate/useTranslation";

const Tab1: FunctionComponent<any> = ({ changeObject }) => {
    const { t } = useTranslation()
    const token: any = useAppSelector(state => state.token.value)
    const [name, setName] = useState<string | null>('')
    const [surname, setSurname] = useState<string | null>('')
    const [birth, setBirth] = useState<Date>(new Date())
    const [height, setHeight] = useState<number | null>(0)
    const [description, setDescription] = useState<string | null>('')
    const [website, setWebsite] = useState<string | null>('')
    const [facebook, setFacebook] = useState<string | null>('')
    const [instagram, setInstagram] = useState<string | null>('')
    const [twitter, setTwitter] = useState<string | null>('')
    const basicInputLength = useAppSelector(state => state.config.basicInputLength)
    const requireHeightNumber = useAppSelector(state => state.config.requireHeightNumber)

    useEffect(() => {
        let object = {};
        if (birth != token.birth) object['birth'] = birth
        if (name != token.name && basicInputLength(name)) object['name'] = name
        if (surname != token.surname && basicInputLength(surname)) object['surname'] = surname
        if (height != token.height && requireHeightNumber(height)) object['height'] = height
        if (description != token.description && basicInputLength(description)) object['description'] = description
        if (website != token.website && basicInputLength(website)) object['website'] = website
        if (facebook != token.facebook && basicInputLength(facebook)) object['facebook'] = facebook
        if (instagram != token.instagram && basicInputLength(instagram)) object['instagram'] = instagram
        if (twitter != token.twitter && basicInputLength(twitter)) object['twitter'] = twitter
        changeObject(object)
    }, [name, surname, birth, height, description, website, facebook, instagram, twitter, token])

    useEffect(() => {
        if (token) {
            setName(token.name)
            setSurname(token.surname)
            setBirth(token.birth)
            setHeight(token.height)
            setDescription(token.description)
            setWebsite(token.website)
            setFacebook(token.facebook)
            setInstagram(token.instagram)
            setTwitter(token.twitter)
        }
    }, [token])

    return (
        <div>
            <TextField
                id="outlined-basic"
                label="Name"
                variant="outlined"
                value={name}
                onChange={(e) => setName(e.target.value)}
                error={
                    name &&
                    name.length > 0 &&
                    !basicInputLength(name)
                }
                helperText={
                    name &&
                        name.length > 0 &&
                        !basicInputLength(name)
                        ? t("home:basicInputLength")
                        : ""
                }
            />
            <TextField
                id="outlined-basic"
                label="Surname"
                variant="outlined"
                value={surname}
                onChange={(e) => setSurname(e.target.value)}
                error={
                    surname &&
                    surname.length > 0 &&
                    !basicInputLength(surname)
                }
                helperText={
                    surname &&
                        surname.length > 0 &&
                        !basicInputLength(surname)
                        ? t("home:basicInputLength")
                        : ""
                }
            />
            <MobileDatePicker
                change={(newDate) => setBirth(newDate)}
                defaultDate={birth}
                label="Birth"
            />
            <TextField
                id="outlined-number"
                label="Height"
                type="number"
                value={height}
                onChange={(e) => setHeight(parseInt(e.target.value))}
                InputLabelProps={{
                    shrink: true,
                }}
                InputProps={{
                    endAdornment: <InputAdornment position="start">cm</InputAdornment>
                }}
                error={
                    !requireHeightNumber(height)
                }
                helperText={
                    !requireHeightNumber(height)
                        ? t("home:requireHeightNumber")
                        : ""
                }
            />
            <TextField
                id="outlined-basic"
                label="Description"
                variant="outlined"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                error={
                    description &&
                    description.length > 0 &&
                    !basicInputLength(description)
                }
                helperText={
                    description &&
                        description.length > 0 &&
                        !basicInputLength(description)
                        ? t("home:basicInputLength")
                        : ""
                }
            />
            <TextField
                id="outlined-basic"
                label="Website"
                variant="outlined"
                value={website}
                onChange={(e) => setWebsite(e.target.value)}
                error={
                    website &&
                    website.length > 0 &&
                    !basicInputLength(website)
                }
                helperText={
                    website &&
                        website.length > 0 &&
                        !basicInputLength(website)
                        ? t("home:basicInputLength")
                        : ""
                }
                InputProps={{
                    startAdornment: <InputAdornment position="start">https://</InputAdornment>
                }}
            />
            <TextField
                id="outlined-basic"
                label="Facebook"
                variant="outlined"
                value={facebook}
                onChange={(e) => setFacebook(e.target.value)}
                error={
                    facebook &&
                    facebook.length > 0 &&
                    !basicInputLength(facebook)
                }
                helperText={
                    facebook &&
                        facebook.length > 0 &&
                        !basicInputLength(facebook)
                        ? t("home:basicInputLength")
                        : ""
                }
                InputProps={{
                    startAdornment: <InputAdornment position="start">https://facebook.com/</InputAdornment>
                }}
            />
            <TextField
                id="outlined-basic"
                label="Instagram"
                variant="outlined"
                value={instagram}
                onChange={(e) => setInstagram(e.target.value)}
                error={
                    instagram &&
                    instagram.length > 0 &&
                    !basicInputLength(instagram)
                }
                helperText={
                    instagram &&
                        instagram.length > 0 &&
                        !basicInputLength(instagram)
                        ? t("home:basicInputLength")
                        : ""
                }
                InputProps={{
                    startAdornment: <InputAdornment position="start">https://instagram.com/</InputAdornment>
                }}
            />
            <TextField
                id="outlined-basic"
                label="Twitter"
                variant="outlined"
                value={twitter}
                onChange={(e) => setTwitter(e.target.value)}
                error={
                    twitter &&
                    twitter.length > 0 &&
                    !basicInputLength(twitter)
                }
                helperText={
                    twitter &&
                        twitter.length > 0 &&
                        !basicInputLength(twitter)
                        ? t("home:basicInputLength")
                        : ""
                }
                InputProps={{
                    startAdornment: <InputAdornment position="start">https://twitter.com/</InputAdornment>
                }}
            />
        </div>
    )
}

export default Tab1;