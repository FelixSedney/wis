<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="Panorama.aspx.cs" Inherits="Felixs2011.Web.Panorama" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title>DeepZoom Panorama</title>
    <meta name="description" content="DeepZoom Panorama's " />
    <meta name="keywords" content="Deepzoom, DeepZoomComposer, Panorama,Panorama Bangkok, Panorama Amersfoort, Jachthuis Sint Hubertus" />
    <link href="IndexPage.css" rel="stylesheet" type="text/css" />
</head>
<body style="background-color: #404040">
    <form id="form1" runat="server">
    <div style="border-top-width: thin; border-top-color: #000099">
        &nbsp; &nbsp; &nbsp; &nbsp;&nbsp;<br />
        <table style="background-color: #404040; border-top-style: solid; border-top-color: #000099;
            font-family: Calibri">
            <tr>
                <td style="width: 551px; vertical-align: baseline; text-align: right; letter-spacing: 2px;
                    height: 52px;">
                    &nbsp;<asp:Label ID="Label1" runat="server" Font-Bold="True" Font-Names="Arial" Font-Size="X-Large"
                        ForeColor="#FFFF80" Text="FelixS "></asp:Label>
                </td>
                <td style="width: 738px; height: 52px;">
                    <asp:Image ID="Image2" runat="server" Height="50px" ImageUrl="~/Images/default.jpg" />
                </td>
            </tr>
            <tr>
                <td style="width: 551px; background-color: #000099; font-weight: bold; vertical-align: top;
                    color: yellow; font-family: Arial; text-align: right; font-variant: small-caps;">
                    Fotografie
                </td>
                <td style="width: 738px; font-weight: bold; color: #ffcc33; font-family: Arial; background-color: #000099;">
                </td>
            </tr>
            <tr>
                <td style="width: 551px">
                    <asp:HyperLink ID="HyperLink2" runat="server" NavigateUrl="http://www.felixs.nl/default.aspx#/homepage"
                        Target="_blank">Home</asp:HyperLink>
                </td>
                <td style="width: 338px;">
                    <h1 style="color: #FFFF80">
                        DeepZoom Panorama</h1>
                </td>
            </tr>
            <tr>
                <td>
                    <h5 style="color: #ffff80">
                        Door op een link te klikken wordt u verbonden met een site waar meer foto's over
                        betreffend onderwerp te vinden zijn. Deze site werkt met Silverlight. De site is
                        daardoor niet te bekijken met een smartphone of tablet.<br />
                        <br />
                    </h5>
                </td>
                <td>
                    <h5 style="color: #ffff80">
                        By clicking one of the links you will be redirected to a page that contains several
                        images with the same subject. To few these images the SILVERLIGHT plugin should
                        be installed. This is not possible on smart phones and tablets.<br />
                        <br />
                    </h5>
                </td>
            </tr>
            <tr>
                <td>
                    <asp:Image ID="Image1" runat="server" ImageUrl="~/Images/Panorama/Bangkok.jpg" AlternateText="Deepzoom panorama bangkok"
                        Width="150px" />
                    <asp:HyperLink ID="HyperLink1" runat="server" NavigateUrl="http://www.felixs.nl/default.aspx#/PanoramaPage"
                        Target="_blank">DeepZoom Panorama van Bangkok</asp:HyperLink>
                </td>
                <td>
                    <asp:Image ID="Image4" runat="server" ImageUrl="~/Images/Panorama/amersfoort.jpg"
                        AlternateText="deepzoom panorama amersfoort" Width="150px" />
                    <asp:HyperLink ID="HyperLink4" runat="server" NavigateUrl="http://www.felixs.nl/default.aspx#/PanoramaPage"
                        Target="_blank">DeepZoom Panorama van Koppelpoort in Amersfoort</asp:HyperLink>
                </td>
            </tr>
            <tr>
                <td>
<asp:Image ID="Image5" runat="server" ImageUrl="~/Images/Panorama/Hubertus.jpg"
                        AlternateText="deepzoom panorama Jachthuis Sint Hubertus" Width="150px" />
                    <asp:HyperLink ID="HyperLink5" runat="server" NavigateUrl="http://www.felixs.nl/default.aspx#/PanoramaPage"
                        Target="_blank">DeepZoom Panorama van Jachthuis Sint Hubertus op de Hoge Veluwe</asp:HyperLink>
                </td>
                <td>
                </td>
            </tr>
            <tr>
                <td>
                    <h4 style="color: #ffff80">
                        <br />
                        <br />
                        DeepZoom is een door Microsoft ontwikkelde techniek om hoge resolutie beelden efficient
                        te tonen. Het samengestelde beeld bestaat uit een groot aantal beelden met verschillende
                        resolutie. In eerste instantie worden lage resolutie beelden geladen, waardoor de
                        laadtijd relatief laag is. Bij het inzoomen worden beelden met hogere resolutie
                        geladen, waardoor er meer details zichtbaar worden.<br />
                        <br />
                        De panorama's zijn opgebouwd uit een aantal 12Mp beelden die met Microsoft Image
                        Composite Editor tot een image zijn gestitched. Daarna zijn de beeldfracties met
                        Microsoft DeepZoomComposer gegenereerd.</h4>
                </td>
                <td>
                    <h4 style="color: #ffff80">
                        <br />
                        <br />
                        DeepZoom is a technology that allows smooth viewing, panning and zooming of high
                        resolution images, developed by Microsoft. A DeepZoom image is composed of many
                        partial images with varying resolutions. This allows fast downloads of the initial
                        image. When zooming in on the image the high resolution images are loaded that are
                        within the users view, allowing a detailed view of that part of the image.<br />
                        <br />
                        The panorama's consists of a few 12Mp images which were stitched with Microsoft Image
                        Composite Editor. Then the high resolution image was split in  image fractions
                        using Microsoft DeepZoomComposer.
                    </h4>
                </td>
            </tr>
        </table>
    </div>
    </form>
</body>
</html>
