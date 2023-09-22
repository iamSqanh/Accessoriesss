import { Button, IconButton, Typography } from "@material-tailwind/react";
import React from "react";

function Drawer() {
    const [openRight, setOpenRight] = React.useState(false);
    const openDrawerRight = () => setOpenRight(true);
    const closeDrawerRight = () => setOpenRight(false);
    return (
        <div>
            <Button onClick={openDrawerRight}>Open Drawer Right</Button>
            <Drawer placement="right" open={openRight} onClose={closeDrawerRight} className="p-4">
                <div className="mb-6 flex items-center justify-between">
                    <Typography variant="h5" color="blue-gray">
                        Drawer on Right
                    </Typography>
                    <IconButton variant="text" color="blue-gray" onClick={closeDrawerRight}>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={2}
                            stroke="currentColor"
                            className="h-5 w-5"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </IconButton>
                </div>
                <h1>123456</h1>
            </Drawer>
        </div>
    );
}

export default Drawer;
