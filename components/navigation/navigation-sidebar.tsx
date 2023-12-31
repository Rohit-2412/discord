import { ModeToggle } from "../mode-toggle";
import { NavigationAction } from "./navigation-action";
import { NavigationItem } from "./navigation-item";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { UserButton } from "@clerk/nextjs";
import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";

export const NavigationSidebar = async () => {
    const profile = await currentProfile();

    if (!profile) return redirect("/");

    const servers = await db.server.findMany({
        where: {
            members: {
                some: {
                    profileId: profile.id,
                },
            },
        },
    });

    return (
        <div className="space-y-4 flex flex-col items-center h-full w-full text-primary dark:bg-[#1e1f22] bg-[#e3e5e8] py-3">
            <NavigationAction />
            <Separator className="h-[2px] bg-zinc-300 dark:bg-zinc-700 w-10 rounded-md mx-auto" />
            <ScrollArea className="w-full flex-1">
                {servers.map((server) => (
                    <div key={server.id} className="mb-4">
                        <NavigationItem
                            id={server.id}
                            name={server.name}
                            imageUrl={server.imageUrl}
                        />
                    </div>
                ))}
            </ScrollArea>
            <div className="pb-3 mt-auto flex items-center flex-col gap-y-4">
                <ModeToggle />
                <UserButton
                    afterSignOutUrl="/"
                    appearance={{
                        elements: {
                            avatarBox: "h-9 w-9",
                        },
                    }}
                />
            </div>
        </div>
    );
};
