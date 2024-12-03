namespace aoc2024;

public class InputReader
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
