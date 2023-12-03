"use client";

import React from "react";
import { useParams } from "next/navigation";

const ConversationsPage = () => {
    const params = useParams();
    const { id } = params;
    return <div>Conservation page for :{id}</div>;
};

export default ConversationsPage;
