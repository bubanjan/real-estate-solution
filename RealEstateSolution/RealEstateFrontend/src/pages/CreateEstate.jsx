import React, { useState } from "react";
import { createEstate } from "../api";
import { useNavigate } from "react-router-dom";
import {
    Container,
    TextField,
    Button,
    Typography,
    Box,
    MenuItem,
    Select,
    FormControl,
    InputLabel,
} from "@mui/material";

const cities = [
    "Budva",
    "Tivat",
    "Kotor",
    "Herceg_Novi",
    "Bar",
    "Petrovac",
    "Ulcinj",
];
const estateTypes = ["Apartment", "House", "Land", "OfficeSpace"];

const CreateEstate = () => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [size, setSize] = useState("");
    const [city, setCity] = useState("");
    const [estateType, setEstateType] = useState("");

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const estateData = {
            title,
            description,
            price: price ? parseFloat(price) : null,
            size: parseInt(size),
            city,
            estateCategory: estateType,
        };

        const result = await createEstate(estateData);
        if (result) {
            alert("Estate created successfully!");
            navigate("/estates");
        } else {
            alert("Failed to create estate. Please try again.");
        }
    };

    return (
        <Container>
            <Typography variant="h4">Add New Estate</Typography>
            <form onSubmit={handleSubmit}>
                <Box mb={2}>
                    <TextField
                        fullWidth
                        label="Title"
                        variant="outlined"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                </Box>
                <Box mb={2}>
                    <TextField
                        fullWidth
                        label="Description"
                        variant="outlined"
                        multiline
                        rows={3}
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </Box>
                <Box mb={2}>
                    <TextField
                        fullWidth
                        label="Price (€)"
                        variant="outlined"
                        type="number"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                    />
                </Box>
                <Box mb={2}>
                    <TextField
                        fullWidth
                        label="Size (sqm)"
                        variant="outlined"
                        type="number"
                        value={size}
                        onChange={(e) => setSize(e.target.value)}
                        required
                    />
                </Box>
                <Box mb={2}>
                    <FormControl fullWidth>
                        <InputLabel>City</InputLabel>
                        <Select
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                            required
                        >
                            {cities.map((cityOption) => (
                                <MenuItem key={cityOption} value={cityOption}>
                                    {cityOption}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Box>
                <Box mb={2}>
                    <FormControl fullWidth>
                        <InputLabel>Estate Type</InputLabel>
                        <Select
                            value={estateType}
                            onChange={(e) => setEstateType(e.target.value)}
                            required
                        >
                            {estateTypes.map((type) => (
                                <MenuItem key={type} value={type}>
                                    {type}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Box>
                <Button type="submit" variant="contained" color="primary">
                    Create Estate
                </Button>
            </form>
        </Container>
    );
};

export default CreateEstate;
