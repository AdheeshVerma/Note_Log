# Input: First, the number of integers
N = int(input())

numbers = [int(input()) for _ in range(N)]


total_sum = sum(numbers)


average = total_sum / N

print(total_sum)

print(average)
