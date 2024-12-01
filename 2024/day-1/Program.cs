// See https://aka.ms/new-console-template for more information
// Console.WriteLine("Hello, World!");

class Program
{
  public static List<int> leftList = new List<int>();
  public static List<int> rightList = new List<int>();

  public static int totalSum = 0;

  static void Main(string[] args)
  {
    Console.WriteLine("--------------\nGet sum of pairs\n");
    InputReader reader = new("./input.txt");

    foreach (string line in reader.InputString)
    {
      int leftNum = getNumInLine(line, false);
      int rightNum = getNumInLine(line, true);

      leftList.Add(leftNum);
      rightList.Add(rightNum);
    }

    leftList.Sort();
    rightList.Sort();

    for (int i = 0; i < leftList.Count; i++)
    {
      // PART 01
      /*
        int sum = leftList[i] - rightList[i];
        sum = Math.Abs(sum);
        totalSum += sum;
      */

      // PART 02
      int times = howManyTimes(leftList[i], rightList);
      int multiplication = leftList[i] * times;

      totalSum += multiplication;
    }

    Console.WriteLine("The total sum is: " + totalSum);
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
  public string[] InputString
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
