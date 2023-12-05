import { ChatHeader } from "@/components/chat/chat-header";
import React from "react";
import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { getOrCreateConversation } from "@/lib/conversation";
import { redirect } from "next/navigation";
import { redirectToSignIn } from "@clerk/nextjs";

interface MemberIdPageProps {
    params: {
        serverId: string;
        memberId: string;
    };
}

const MemberIdPage = async ({ params }: MemberIdPageProps) => {
    const profile = await currentProfile();

    if (!profile) redirectToSignIn();

    const currentMember = await db.member.findFirst({
        where: {
            serverId: params.serverId,
            profileId: profile?.id,
        },
        include: {
            profile: true,
        },
    });

    if (!currentMember) return redirect("/");

    const conversation = await getOrCreateConversation(
        currentMember.id,
        params.memberId
    );

    if (!conversation) return redirect(`/servers/${params.serverId}`);

    const { memberOne, memberTwo } = conversation;

    const otherMember =
        memberOne.profileId == profile?.id ? memberTwo : memberOne;

    return (
        <div className="bg-white dark:bg-[#313338] flex flex-col h-full">
            <ChatHeader
                serverId={params.serverId}
                name={otherMember.profile?.name}
                type="conversation"
                imageUrl={otherMember.profile?.imageUrl}
            />
        </div>
    );
};

export default MemberIdPage;
