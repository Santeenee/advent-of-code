namespace aoc2024.Day3;

class Day3
{
  public static int totalSum = 0;
  public static List<int[]> pairs = [];

  static void Main(string[] args)
  {
    string inputPath = args.Length > 0 ? args[0] : "demoInput";
    Console.WriteLine($"--------------\n{inputPath}\nGet sum of pairs\n");

    InputReader reader = new($"./{inputPath}.txt");
    string text = reader.InputString;

    int lastIndex = text.IndexOf("mul(", 0);

    //finché viene trovato un mul( si continua a cercare.
    while (lastIndex != -1)
    {
      getNumbers(text, lastIndex + 4);

      lastIndex = text.IndexOf("mul(", lastIndex + 4);
    }

    foreach (int[] pair in pairs)
    {
      totalSum += (pair[0] * pair[1]);
    }

    Console.WriteLine("The total sum is: " + totalSum);
  }

  public static bool getNumbers(string txt, int fromIndex)
  {
    int lastIndexFirstNumber = 0;
    for (int i = 0; Char.IsDigit(txt[fromIndex + i]); i++)
    {
      lastIndexFirstNumber = fromIndex + i;
    }

    if (lastIndexFirstNumber == 0 || txt[lastIndexFirstNumber + 1] != ',') return false;

    int fromIndexSecondNumber = lastIndexFirstNumber + 2;
    int lastIndexSecondNumber = 0;
    for (int i = 0; Char.IsDigit(txt[fromIndexSecondNumber + i]); i++)
    {
      lastIndexSecondNumber = fromIndexSecondNumber + i;
    }

    if (lastIndexSecondNumber == 0 || txt[lastIndexSecondNumber + 1] != ')') return false;

    int firstNum = Int32.Parse(txt.Substring(fromIndex, lastIndexFirstNumber - fromIndex + 1));
    int secondNum = Int32.Parse(
      txt.Substring(fromIndexSecondNumber, lastIndexSecondNumber - fromIndexSecondNumber + 1)
    );
    System.Console.Write(firstNum + " ");
    System.Console.Write(secondNum + "\n");
    pairs.Add([firstNum, secondNum]);

    return true;
  }
}

public class InputReader
{
  public string InputString { get; set; }

  public InputReader(string path)
  {
    InputString = "";
    getInput(path);
  }

  private void getInput(string path)
  {
    try
    {
      InputString = File.ReadAllText(path);
    }
    catch (System.Exception)
    {
      Console.WriteLine("\n[ERROR] while reading the input file\n");
      throw;
    }
  }
}
