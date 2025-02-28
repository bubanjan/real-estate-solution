import React, { useEffect, useState } from "react";
import { getEstates } from "../api";
import {
    Container,
    Typography,
    Button,
    List,
    ListItem,
    ListItemText,
    Stack,
} from "@mui/material";
import { Link } from "react-router-dom";

const Estates = () => {
    const [estates, setEstates] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const data = await getEstates();
            if (data) setEstates(data);
        };
        fetchData();
    }, []);

    return (
        <Stack>
            <Typography variant="h4">Available Estates</Typography>
            <List>
                {estates.map((estate) => (
                    <ListItem key={estate.id} divider>
                        <ListItemText
                            primary={`${estate.title} - ${estate.city}`}
                            secondary={
                                <>
                                    <Typography>
                                        Category: {estate.estateCategory}
                                    </Typography>
                                    <Typography>
                                        Price: $
                                        {estate.price ? estate.price : "N/A"}
                                    </Typography>
                                    <Typography>
                                        Size: {estate.size} sqm
                                    </Typography>
                                    <Typography>
                                        Description:{" "}
                                        {estate.description
                                            ? estate.description
                                            : "No description"}
                                    </Typography>
                                </>
                            }
                        />
                        <Button
                            component={Link}
                            to={`/estate/${estate.id}`}
                            variant="outlined"
                        >
                            View Details
                        </Button>
                    </ListItem>
                ))}
            </List>
        </Stack>
    );
};

export default Estates;
