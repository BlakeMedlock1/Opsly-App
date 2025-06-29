import EmployeeNavbar from '@/components/EmployeeNavbar'
import TopHeader from '@/components/Header'
import { getUserStats } from '@/lib/api/stats'
import React, { useEffect, useState } from 'react'
import { Card, Text, XStack, YStack } from 'tamagui'
import { getCurrentUserId } from '../auth/authHelpers'

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
  const [stats, setStats] = useState<{
    tasks_completed: number
    pending_approval: number
    rejected_tasks: number
    approved_this_week: number
  } | null>(null)

  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadStats() {
      try {
        const userId = await getCurrentUserId()
        if (!userId) throw new Error('User not authenticated')

        const data = await getUserStats(userId)
        setStats(data)
      } catch (err) {
        console.error('Failed to load stats', err)
      } finally {
        setLoading(false)
      }
    }
    loadStats()
  }, [])

  if (loading) {
    return (
      <>
        <TopHeader />
        <YStack flex={1} backgroundColor="#22303D" padding="$4" justifyContent="center" alignItems="center">
          <Text color="#fff">Loading stats...</Text>
        </YStack>
        <EmployeeNavbar />
      </>
    )
  }

  if (!stats) {
    return (
      <>
        <TopHeader />
        <YStack flex={1} backgroundColor="#22303D" padding="$4" justifyContent="center" alignItems="center">
          <Text color="#fff">No stats available.</Text>
        </YStack>
        <EmployeeNavbar />
      </>
    )
  }

  return (
    <>
      <TopHeader />
      <YStack flex={1} backgroundColor="#22303D" padding="$4" gap="$4">
        <Text fontSize="$8" color="#fff" fontWeight="700" textAlign="center">
          My Stats
        </Text>

        <XStack justifyContent="space-between" flexWrap="wrap" gap="$3">
          <StatCard label="Tasks Completed" value={stats.tasks_completed} color="#4ade80" />
          <StatCard label="Pending Approval" value={stats.pending_approval} color="#facc15" />
          <StatCard label="Rejected Tasks" value={stats.rejected_tasks} color="#f87171" />
          <StatCard label="Approved This Week" value={stats.approved_this_week} color="#38bdf8" />
        </XStack>

        <YStack marginTop="$6" gap="$3">
          <Text fontSize="$5" fontWeight="700" color="#fff">
            Weekly Overview
          </Text>
          {/* Can add charts here later */}
          <Card backgroundColor="#1e293b" padding="$4" borderRadius="$6" elevation="$1">
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
