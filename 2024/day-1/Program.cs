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
    InputReader reader = new(false);

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
      int sum = leftList[i] - rightList[i];
      sum = Math.Abs(sum);
      totalSum += sum;
    }

    Console.WriteLine(String.Join("; ", leftList));
    Console.WriteLine(String.Join("; ", rightList));
    Console.WriteLine("The total sum is: " + totalSum);
    // leftList.ForEach(Console.Write);
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

  public InputReader(bool isDemo)
  {
    getInput(isDemo);
  }

  private void getInput(bool isDemo)
  {
    string inputPath = isDemo ? "./demoInput.txt" : "./input.txt";

    try
    {
      InputString = File.ReadAllLines(inputPath);
    }
    catch (System.Exception)
    {
      Console.WriteLine("\nan error occured while reading the input file\n");
      throw;
    }
  }
}