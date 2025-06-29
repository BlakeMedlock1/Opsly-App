import EmployeeNavbar from '@/components/EmployeeNavbar'
import TopHeader from '@/components/Header'
import React from 'react'
import { Card, Text, XStack, YStack } from 'tamagui'

const StatCard = ({ label, value, color }: { label: string; value: number; color: string }) => (
  <Card
    elevate
    bordered
    padding="$4"
    borderRadius="$6"
    backgroundColor="#2c3e50"
    width="48%"
    height={120}
    justifyContent="center"
    alignItems="center"
    shadowColor="black"
    shadowOpacity={0.15}
  >
    <Text fontSize="$6" color={color} fontWeight="800">
      {value}
    </Text>
    <Text fontSize="$3" color="#ffffff99" textAlign="center">
      {label}
    </Text>
  </Card>
)

export default function StatsPage() {
  return (
    <>
      <TopHeader />
      <YStack flex={1} backgroundColor="#22303D" padding="$4" gap="$4">
        <Text fontSize="$8" color="#fff" fontWeight="700" textAlign="center">
          My Stats
        </Text>

        <XStack justifyContent="space-between" flexWrap="wrap" gap="$3">
          <StatCard label="Tasks Completed" value={18} color="#4ade80" />
          <StatCard label="Pending Approval" value={5} color="#facc15" />
          <StatCard label="Rejected Tasks" value={2} color="#f87171" />
          <StatCard label="Approved This Week" value={12} color="#38bdf8" />
        </XStack>

        <YStack marginTop="$6" gap="$3">
          <Text fontSize="$5" fontWeight="700" color="#fff">
            Weekly Overview
          </Text>
          {/* Will add chart or breakdown here later */}
          <Card
            backgroundColor="#1e293b"
            padding="$4"
            borderRadius="$6"
            elevation="$1"
          >
            <Text color="#ffffffaa">
              Keep up the great work! Your task approval rate is 86% this week.
            </Text>
          </Card>
        </YStack>
      </YStack>
      <EmployeeNavbar />
    </>
  )
}
