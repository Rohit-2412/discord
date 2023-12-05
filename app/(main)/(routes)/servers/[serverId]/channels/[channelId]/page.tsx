"use client";

import React from "react";
import { useParams } from "next/navigation";

const ChannelPage = () => {
    const params = useParams();
    const { channelId } = params;
    return <div>Channel Page for :{channelId}</div>;
};

export default ChannelPage;
