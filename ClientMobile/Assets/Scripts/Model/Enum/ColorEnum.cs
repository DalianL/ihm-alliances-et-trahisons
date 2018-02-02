using System;
using UnityEngine;

namespace AssemblyCSharp
{
	[Serializable]
	public enum ColorEnum
	{
		RED,
		BROWN,
		BLUE,
		GREEN,
		ORANGE,
		VIOLET,
		NO_COLOR
	}

	public static class ColorEnumHelper
	{
		public static Color32 GetColor(ColorEnum color) 
		{
			switch (color) 
			{
			case ColorEnum.RED:
				return new Color32(255,0,0,255);
			case ColorEnum.BROWN :
				return new Color32(96,66,42,255);
			case ColorEnum.BLUE :
				return new Color32(0,0,255,255);
			case ColorEnum.GREEN:
				return new Color32(0,255,0,255);
			case ColorEnum.ORANGE :
				return new Color32(255,130,0,255);
			case ColorEnum.VIOLET :
				return new Color32(255,0,255,255);
			default :
				return new Color32(255,255,255,255);
			}
		}

		public static string ToExplicitString(ColorEnum color) 
		{
			switch (color) 
			{
			case ColorEnum.RED:
				return "RED";
			case ColorEnum.BROWN :
				return "BROWN";
			case ColorEnum.BLUE :
				return "BLUE";
			case ColorEnum.GREEN:
				return "GREEN";
			case ColorEnum.ORANGE :
				return "ORANGE";
			case ColorEnum.VIOLET :
				return "VIOLET";
			case ColorEnum.NO_COLOR :
				return "NO_COLOR";
			default :
				return "NO_COLOR";
			}
		}

		public static ColorEnum ToEnum(string str) 
		{
			switch (str) 
			{
			case "RED" :
				return ColorEnum.RED;
			case "BROWN" :
				return ColorEnum.BROWN;
			case "BLUE" :
				return ColorEnum.BLUE;
			case "GREEN" :
				return ColorEnum.GREEN;
			case "ORANGE" :
				return ColorEnum.ORANGE;
			case "VIOLET" :
				return ColorEnum.VIOLET;
			case "NO_COLOR" :
				return ColorEnum.NO_COLOR;
			default :
				return ColorEnum.NO_COLOR;
			}
		}
	}
}

