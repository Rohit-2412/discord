"use client";

import React from "react";
import { useParams } from "next/navigation";

const ChannelPage = () => {
    const params = useParams();
    const { id } = params;
    return <div>ChannelPage for :{id}</div>;
};

export default ChannelPage;
