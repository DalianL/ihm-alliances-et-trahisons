using System;

namespace AssemblyCSharp
{
	[Serializable]
	public enum SpeciesEnum
	{
		GUNGANS, 
		JAWAS, 
		WOOKIES,
		EWOKS,
		NO_SPECIE
	}

	public static class SpeciesEnumHelper
	{
		public static string ToExplicitString(SpeciesEnum specie) 
		{
			switch (specie) 
			{
			case SpeciesEnum.WOOKIES:
				return "Wookies";
			case SpeciesEnum.JAWAS :
				return "Jawas";
			case SpeciesEnum.GUNGANS :
				return "Gungans";
			case SpeciesEnum.EWOKS:
				return "Ewoks";
			default :
				return "NO_SPECIE";
			}
		}

		public static int ToInt(SpeciesEnum specie) 
		{
			switch (specie) 
			{
			case SpeciesEnum.GUNGANS:
				return 0;
			case SpeciesEnum.JAWAS:
				return 1;
			case SpeciesEnum.WOOKIES :
				return 2;
			case SpeciesEnum.EWOKS :
				return 3;
			default :
				return -1;
			}
		}

		public static SpeciesEnum ToEnum(string str) 
		{
			switch (str) 
			{
			case "Wookies" :
				return SpeciesEnum.WOOKIES;
			case "Jawas" :
				return SpeciesEnum.JAWAS;
			case "Gungans" :
				return SpeciesEnum.GUNGANS;
			case "Ewoks" :
				return SpeciesEnum.EWOKS;
			default :
				return SpeciesEnum.NO_SPECIE;
			}
		}
	}
}

