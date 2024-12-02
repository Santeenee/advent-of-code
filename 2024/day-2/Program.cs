// See https://aka.ms/new-console-template for more information
// Console.WriteLine("Hello, World!");

class Program
{
  public static List<int> leftList = [];
  public static List<int> rightList = [];

  public static int totalSum = 0;

  static void Main(string[] args)
  {
    Console.WriteLine("--------------\nGet sum of pairs\n");

    InputReader reader = new("./input.txt");

    foreach (string report in reader.InputString)
    {
      bool isSafe = getReportSafety(report);
      if (isSafe) totalSum++;
    }

    Console.WriteLine("The total sum is: " + totalSum);
  }

  public static bool getReportSafety(string reportString)
  {
    // populate List<int> report
    List<int> report = [];

    string[] reportSplit = reportString.Split(" ");
    for (int i = 0; i < reportSplit.Length; i++)
    {
      report.Add(Int32.Parse(reportSplit[i]));
    }

    // check safety
    int constantSlopeCheck = 0;
    for (int level = 0; level < report.Count - 1; level++)
    {
      if (report[level + 1] - report[level] > 0) constantSlopeCheck++;

      int difference = report[level] - report[level + 1];
      difference = Math.Abs(difference);
      if (difference > 3 || difference <= 0) return false;
    }

    if (
      constantSlopeCheck == (report.Count - 1)
      || constantSlopeCheck == 0
    ) return true;

    return false;
  }

  public static int howManyTimes(int searchNum, List<int> list)
  {
    //find
    int foundIndex = list.IndexOf(searchNum);
    if (foundIndex < 0) return 0;

    //and count
    int count = 1;
    while (list[foundIndex + count] == searchNum)
    {
      count++;
    }

    return count;
  }

  public static int getNumInLine(string line, bool fromEnd)
  {
    string tempString = "";
    int charIndex = fromEnd ? line.Length - 1 : 0;

    while (Char.IsDigit(line[charIndex]))
    {
      if (fromEnd)
      {
        tempString = $"{line[charIndex]}{tempString}";
        charIndex--;
      }
      else
      {
        tempString += line[charIndex];
        charIndex++;
      }
    }

    int result = 0;
    Int32.TryParse(tempString, out result);

    return result;
  }
}

class InputReader
{
  public string[]? InputString
  { get; set; }

  public InputReader(string path)
  {
    getInput(path);
  }

  private void getInput(string path)
  {
    try
    {
      InputString = File.ReadAllLines(path);
    }
    catch (System.Exception)
    {
      Console.WriteLine("\n[ERROR] while reading the input file\n");
      throw;
    }
  }
}
