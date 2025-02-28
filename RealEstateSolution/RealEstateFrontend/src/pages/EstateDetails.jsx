import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getEstateById } from "../api";
import { Container, Typography, Box } from "@mui/material";

const EstateDetails = () => {
    const { id } = useParams();
    const [estate, setEstate] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            const data = await getEstateById(id);
            if (data) setEstate(data);
        };
        fetchData();
    }, [id]);

    if (!estate) return <Typography>Loading...</Typography>;

    return (
        <Container>
            <Typography variant="h4">{estate.title}</Typography>
            <Box>
                <Typography variant="h6">
                    Category: {estate.estateCategory}
                </Typography>
                <Typography>City: {estate.city}</Typography>
                <Typography>
                    Price: €{estate.price ? estate.price : "N/A"}
                </Typography>
                <Typography>Size: {estate.size} sqm</Typography>
                <Typography>
                    Description:{" "}
                    {estate.description
                        ? estate.description
                        : "No description available"}
                </Typography>
            </Box>
        </Container>
    );
};

export default EstateDetails;
