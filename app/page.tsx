"use client";

import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { GradientText } from "@/components/ui/gradient-text";
import {
  SparkleIcon,
  MapPinIcon,
  TrendUpIcon,
  UsersIcon,
  ChatCircleIcon,
  HeartIcon,
  ShareIcon,
} from "@phosphor-icons/react";
import { InstagramIcon } from "@/lib/morphy-ui/morphy";

const features = [
  {
    icon: SparkleIcon,
    title: "AI Magic",
    description: "Deals that match your vibe, no cap fr fr",
    variant: "purple" as const,
  },
  {
    icon: MapPinIcon,
    title: "Local Flex",
    description: "Best deals around your campus, periodt",
    variant: "blue" as const,
  },
  {
    icon: TrendUpIcon,
    title: "Student Only",
    description: "Exclusive drops for the college squad",
    variant: "green" as const,
  },
  {
    icon: UsersIcon,
    title: "Squad Goals",
    description: "Share the best finds with your crew",
    variant: "orange" as const,
  },
];

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-background/80 to-background/20 backdrop-blur-sm" />
        <div className="container relative z-10 px-4 mx-auto max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Hero Content */}
            <div className="flex flex-col items-start text-left space-y-8">
              <div className="max-w-2xl">
                <h1 className="text-5xl md:text-7xl font-bold mb-6">
                  <GradientText
                    variant="default"
                    className="text-5xl md:text-7xl"
                  >
                    GenZDealZ.ai
                  </GradientText>
                </h1>
                <p className="text-xl md:text-2xl text-muted-foreground font-medium mb-8">
                  Your AI-powered shopping journey begins here.
                  <br />
                  <span className="text-primary">No cap, just vibes.</span>
                </p>
                <div className="space-y-4 mb-8">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-[#d0427f] to-[#303293] flex items-center justify-center">
                      <SparkleIcon
                        className="h-4 w-4 text-white"
                        weight="duotone"
                      />
                    </div>
                    <span className="text-lg">AI-powered deal discovery</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-[#d0427f] to-[#303293] flex items-center justify-center">
                      <MapPinIcon
                        className="h-4 w-4 text-white"
                        weight="duotone"
                      />
                    </div>
                    <span className="text-lg">Local campus deals</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-[#d0427f] to-[#303293] flex items-center justify-center">
                      <UsersIcon
                        className="h-4 w-4 text-white"
                        weight="duotone"
                      />
                    </div>
                    <span className="text-lg">Student community</span>
                  </div>
                </div>
                <Link href="/genzgpt">
                  <Button variant="multi" size="lg" showRipple>
                    Ask GenZGPT
                  </Button>
                </Link>
              </div>
            </div>

            {/* Community Feed */}
            <div className="relative">
              <Card
                variant="multi"
                showRipple={false}
                icon={{
                  icon: InstagramIcon,
                  title: "Instagram Feed",
                  subtitle: "Real student experiences",
                }}
              >
                <div className="space-y-4 max-h-96 overflow-y-auto">
                  {[
                    {
                      username: "genzdealz_official",
                      avatar: "👨‍💻",
                      content:
                        "Just dropped our latest student deals! 🎓✨ Check out exclusive discounts on courses, gadgets, and more. #StudentLife #Deals #GenZ",
                      likes: 1247,
                      time: "2h ago",
                    },
                    {
                      username: "tech_savvy_student",
                      avatar: "🎓",
                      content:
                        "Thanks @genzdealz_official for the amazing laptop deal! Saved me $300 on my new MacBook. Best student platform ever! 💻🙏",
                      likes: 892,
                      time: "4h ago",
                    },
                    {
                      username: "college_life_2024",
                      avatar: "📚",
                      content:
                        "Just discovered this awesome AI assistant that helps with everything from homework to finding the best deals. Game changer! 🤖✨",
                      likes: 567,
                      time: "6h ago",
                    },
                    {
                      username: "budget_student",
                      avatar: "💰",
                      content:
                        "Pro tip: Always check @genzdealz_official before making any big purchases. You&apos;ll be surprised how much you can save! 💡",
                      likes: 445,
                      time: "8h ago",
                    },
                  ].map((post, index) => (
                    <div
                      key={index}
                      className="border-b border-border/50 pb-4 last:border-b-0"
                    >
                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center text-sm">
                          {post.avatar}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-semibold text-sm">
                              @{post.username}
                            </span>
                            <span className="text-xs text-muted-foreground">
                              •
                            </span>
                            <span className="text-xs text-muted-foreground">
                              {post.time}
                            </span>
                          </div>
                          <p className="text-sm text-foreground mb-2 leading-relaxed">
                            {post.content}
                          </p>
                          <div className="flex items-center gap-4 text-xs text-muted-foreground">
                            <Button
                              variant="glass"
                              size="sm"
                              showRipple
                              icon={{ icon: HeartIcon }}
                            >
                              <span>{post.likes}</span>
                            </Button>
                            <Button
                              variant="glass"
                              size="sm"
                              showRipple
                              icon={{ icon: ChatCircleIcon }}
                            >
                              <span>Comment</span>
                            </Button>
                            <Button
                              variant="glass"
                              size="sm"
                              showRipple
                              icon={{ icon: ShareIcon }}
                            >
                              <span>Share</span>
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-6 pt-4 border-t border-border">
                  <Button
                    variant="glass"
                    size="sm"
                    showRipple
                    className="w-full"
                    icon={{ icon: InstagramIcon }}
                  >
                    Follow on Instagram
                  </Button>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-background/50">
        <div className="container px-4 mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <GradientText variant="default">
                Why We&apos;re Different
              </GradientText>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              We&apos;re not your average shopping app. We&apos;re built
              different.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature) => (
              <div key={feature.title}>
                <Card
                  variant={feature.variant}
                  className="h-full rounded-2xl"
                  showRipple
                  icon={{
                    icon: feature.icon,
                    title: feature.title,
                  }}
                >
                  <div className="space-y-4">
                    <h3 className="text-2xl font-bold">
                      <GradientText variant={feature.variant}>
                        {feature.title}
                      </GradientText>
                    </h3>
                    <p className="text-lg text-muted-foreground">
                      {feature.description}
                    </p>
                  </div>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
