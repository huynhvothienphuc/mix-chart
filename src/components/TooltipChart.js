import { Box, Divider, Grid, Typography } from "@mui/material";
import React, { ReactNode } from "react";
import { v4 as uuidv4 } from "uuid";
import { dummyTooltips } from "./constants";

const TooltipChart = () => {
    const RenderReviewInfo = ({
        label,
        amount,
    }) => {
        return (
            <Box sx={{ width: "130px", textAlign: "center", padding: "20px 0px" }}>
                <Typography
                    sx={{
                        color: "black",
                        fontSize: "14px",
                        paddingBottom: "10px",
                    }}
                >
                    {label}
                </Typography>
                <Typography sx={{ fontSize: "20px", fontWeight: 700 }}>
                    {amount}
                </Typography>
            </Box>
        );
    };
    return (
        <Box sx={{ width: "450px" }}>
            <Typography sx={{ fontSize: "24px", fontWeight: 700 }}>
                2023. 07
            </Typography>
            <Box
                sx={{
                    display:'flex',
                    margin: "30px 0px",
                    background: "#FAF3FE",
                    borderRadius: "12px",
                }}
            >
                <RenderReviewInfo label="총 리뷰" amount="132개" />
                <Divider orientation="vertical" variant="middle" flexItem />
                <RenderReviewInfo label="평균 평점" amount="9.1점" />
                <Divider orientation="vertical" variant="middle" flexItem />
                <RenderReviewInfo label="총 리뷰" amount="91%" />
            </Box>
            <Typography
                sx={{ fontSize: "16px", fontWeight: 700, marginBottom: "15px" }}
            >
                카테고리별 언급량
            </Typography>
            <Grid container>
                {dummyTooltips.map((_) => (
                    <Grid xs={6} key={uuidv4()} sx={{ marginBottom: "15px", padding: "0px 10px" }}>
                        <Box sx={{display:'flex'}}>
                            <Box sx={{display:'flex'}}>
                                <Box
                                    sx={{
                                        alignSelf: "center",
                                        background: _.color,
                                        height: "12px",
                                        width: "12px",
                                    }}
                                ></Box>
                                <Typography
                                    sx={{
                                        padding: "0px 10px",
                                        fontSize: "14px",
                                    }}
                                >
                                    {_.label}
                                </Typography>
                            </Box>
                            <Typography sx={{ padding: "0px 10px", fontSize: "14px" }}>
                                {_.total}
                            </Typography>
                        </Box>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};

export default TooltipChart;
