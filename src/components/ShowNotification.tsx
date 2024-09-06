import { cn } from "@/lib/utils";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useTranslation } from "react-i18next";
import { useFetchNotificationData } from "@/Hooks/useNotificationsFetch";
import LottiePlayer from "./Loading";

interface notificaitonType {
  ID: number;
  Title: string;
  Text: string;
}

type CardProps = React.ComponentProps<typeof Card>;

export function ShowNotification({ className, ...props }: CardProps) {
  const { t } = useTranslation();
  const { data: notificationData, isLoading: notificationLoading } =
    useFetchNotificationData(1);

  // useEffect(() => {
  //   console.log(notificationData);
  // }, [notificationData]);

  return (
    <Card className={cn("w-[220px] sm:w-[380px]", className)} {...props}>
      <CardHeader>
        <CardTitle className="text-[14px] sm:text-[18px] md:text-[22px]">{t("Notifications")}</CardTitle>
      </CardHeader>
      {notificationLoading ? (
        <LottiePlayer />
      ) : (
        <CardContent className="grid gap-4">
          <div>
            {notificationData?.Data?.map(
              (notification: notificaitonType, index: number) => (
                <div
                  key={index}
                  className="mb-4 grid grid-cols-[25px_1fr] items-start pb-4 last:mb-0 last:pb-0"
                >
                  <span className="flex h-2 w-2 translate-y-1 rounded-full bg-sky-500" />
                  <div className="space-y-1">
                    <p className="text-[11px] sm:text-sm font-medium leading-none">
                      {notification.Title}
                    </p>
                    <p className="text-[11px] sm:text-sm text-muted-foreground">
                      {notification.Text}
                    </p>
                  </div>
                </div>
              )
            )}
          </div>
        </CardContent>
      )}
      {/* <CardFooter>
        <Button className="w-full text-white">
          <Check className="mr-2 h-4 w-4" /> {t("MarkAllAsRead")}
        </Button>
      </CardFooter> */}
    </Card>
  );
}
