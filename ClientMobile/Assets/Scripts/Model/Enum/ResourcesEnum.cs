using System;

namespace AssemblyCSharp
{
	[Serializable]
	public enum ResourcesEnum
	{
		RED_CRYSTAL_KYBER,
		GREEN_CRYSTAL_KYBER,
		BLUE_CRYSTAL_KYBER,
		VIOLET_CRYSTAL_KYBER,
		NO_RESOURCE
	}

	public static class ResourcesEnumHelper
	{
		public static string ToExplicitString(ResourcesEnum resource) 
		{
			switch (resource) 
			{
			case ResourcesEnum.RED_CRYSTAL_KYBER:
				return "Crystal Kyber rouge";
			case ResourcesEnum.GREEN_CRYSTAL_KYBER :
				return "Crystal Kyber vert";
			case ResourcesEnum.BLUE_CRYSTAL_KYBER :
				return "Crystal Kyber bleu";
			case ResourcesEnum.VIOLET_CRYSTAL_KYBER:
				return "Crystal Kyber violet";
			default :
				return "NO_RESOURCE";
			}
		}

		public static ResourcesEnum ToEnum(string str) 
		{
			switch (str) 
			{
			case "Crystal Kyber rouge" :
				return ResourcesEnum.RED_CRYSTAL_KYBER;
			case "Crystal Kyber vert" :
				return ResourcesEnum.GREEN_CRYSTAL_KYBER;
			case "Crystal Kyber bleu" :
				return ResourcesEnum.BLUE_CRYSTAL_KYBER;
			case "Crystal Kyber violet" :
				return ResourcesEnum.VIOLET_CRYSTAL_KYBER;
			case "RED_CRYSTAL_KYBER" :
				return ResourcesEnum.RED_CRYSTAL_KYBER;
			case "GREEN_CRYSTAL_KYBER" :
				return ResourcesEnum.GREEN_CRYSTAL_KYBER;
			case "BLUE_CRYSTAL_KYBER" :
				return ResourcesEnum.BLUE_CRYSTAL_KYBER;
			case "VIOLET_CRYSTAL_KYBER" :
				return ResourcesEnum.VIOLET_CRYSTAL_KYBER;
			default :
				return ResourcesEnum.NO_RESOURCE;
			}
		}

		public static string ToInitial(ResourcesEnum r) 
		{
			switch (r) {
			case ResourcesEnum.RED_CRYSTAL_KYBER:
				return "R";
			case ResourcesEnum.GREEN_CRYSTAL_KYBER:
				return "G";
			case ResourcesEnum.BLUE_CRYSTAL_KYBER:
				return "B";
			case ResourcesEnum.VIOLET_CRYSTAL_KYBER:
				return "V";
			default :
				return "NO_RESOURCE";
			}
		}
	}
}

