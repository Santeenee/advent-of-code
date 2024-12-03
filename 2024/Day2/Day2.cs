namespace aoc2024.Day2;

using aoc2024.InputReader;

class Day2
{
  public static int totalSum = 0;
  public static List<int> report = [];

  static void Main(string[] args)
  {
    Console.WriteLine($"--------------\n{args[0]}\nGet sum of pairs\n");

    InputReader reader = new($"./{args[0] ?? "demoInput"}.txt");

    int a = 0;
    foreach (string reportString in reader.InputString)
    {
      // populate List<int> report
      report = [];
      string[] reportSplit = reportString.Split(" ");
      for (int i = 0; i < reportSplit.Length; i++)
      {
        report.Add(Int32.Parse(reportSplit[i]));
      }

      Console.Write(reportString.PadRight(24));
      bool isSafe = getReportSafety();
      Console.Write($" {isSafe}\n");
      if (isSafe) totalSum++;
      a++;
    }

    Console.WriteLine("The total sum is: " + totalSum);
  }

  public static bool getReportSafety(int safetyNum = 0)
  {
    // check safety
    int constantSlopeCount = 0;
    for (int level = 0; level < report.Count - 1; level++)
    {
      if (report[level + 1] - report[level] > 0) constantSlopeCount++;

      int difference = report[level] - report[level + 1];
      difference = Math.Abs(difference);

      // if it finds an error
      if (
        (difference > 3 || difference == 0)
        ||
        (constantSlopeCount != (level + 1) && constantSlopeCount != 0)
      )
      {
        // tolerance: 1 error per report
        if (safetyNum < 1)
        {
          //remove possible error
          if (checkAllLevels()) return true;
        }
        return false;
      }
    }

    return true;
  }

  public static bool checkAllLevels()
  {
    for (int i = 0; i < report.Count; i++)
    {
      int prevValue = report[i];
      report.RemoveAt(i);
      bool isSafe = getReportSafety(1);
      report.Insert(i, prevValue);
      if (isSafe) return true;
    }
    return false;
  }
}
